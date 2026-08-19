import type { APIRoute } from 'astro';
import { env } from "cloudflare:workers";
import { render } from '@react-email/render';
import { ContactNotificationEmail } from '../../emails/ContactNotificationEmail';
import { AutoReplyEmail } from '../../emails/AutoReplyEmail';

export const prerender = false;

const getSubjectText = (val: string) => {
  const map: Record<string, string> = {
    corporate_service: 'サービス導入・協業に関するご相談',
    corporate_recruit: '人材採用・パートナーシップのご相談',
    corporate_other: 'その他（コーポレート関連）',
    liver_audition: 'ライバー所属・オーディション応募',
    liver_business: '企業案件・コラボレーションのご相談',
    liver_other: 'その他（ライバーマネジメント関連）'
  };
  return map[val] || val;
};



export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.formData();
    const subject = data.get('subject')?.toString() || '';
    const name = data.get('name')?.toString() || '';
    const tel = data.get('tel')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const message = data.get('message')?.toString() || '';

    // バリデーション
    if (!subject || !name || !tel || !email) {
      return new Response(
        JSON.stringify({ error: '必須項目が入力されていません。' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // 環境変数の取得（Cloudflare workers env または import.meta.env / process.env）
    const runtimeEnv = (typeof env !== 'undefined' ? env : {}) as any;
    const fromEmail = runtimeEnv.FROM_EMAIL || import.meta.env.FROM_EMAIL || process.env.FROM_EMAIL || 'info@genesis-llc.co.jp';
    const toEmail = runtimeEnv.TO_EMAIL || import.meta.env.TO_EMAIL || process.env.TO_EMAIL || 'info@genesis-llc.co.jp';
    const apiKey = runtimeEnv.CONTACT_RESEND_API_KEY || import.meta.env.CONTACT_RESEND_API_KEY || process.env.CONTACT_RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'サーバーのAPIキー設定が不足しています。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 管理者向け通知メールの生成
    const adminHtml = await render(ContactNotificationEmail({ subject, data: { name, tel, email, message } }));

    // お客様向け自動返信メールの生成
    const autoReplyHtml = await render(AutoReplyEmail({ subject, data: { name, tel, email, message } }));

    // ResendのAPIを叩いて管理者へ通知
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Genesis お問い合わせ <${fromEmail}>`,
        to: [toEmail],
        subject: `Webサイトからのお問い合わせ: ${name} 様`,
        html: adminHtml,
        reply_to: email,
      }),
    });

    const adminResendData = (await adminRes.json()) as any;

    if (!adminRes.ok) {
      throw new Error(adminResendData?.message || '管理者へのメール送信に失敗しました');
    }

    // ResendのAPIを叩いてお客様へ自動返信
    const autoReplyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Genesis合同会社 <${fromEmail}>`, // 送信元を会社名に
        to: [email], // お客様のメールアドレス
        subject: `【Genesis】お問い合わせを受け付けました`,
        html: autoReplyHtml,
      }),
    });

    const autoReplyResendData = (await autoReplyRes.json()) as any;

    if (!autoReplyRes.ok) {
      console.error("Auto-reply failed:", autoReplyResendData);
      // 自動返信が失敗しても、管理者には通知済みなのでエラーにはせずログのみ残す運用が一般的です。
    }

    return new Response(JSON.stringify({ success: true, data: adminResendData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : "メール送信でエラーが発生しました";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
