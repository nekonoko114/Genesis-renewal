import type { APIRoute } from 'astro';
import { env } from "cloudflare:workers";
import { render } from '@react-email/render';
import { ContactNotificationEmail } from '../../emails/ContactNotificationEmail';

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

    // HTMLメールの生成 (React Emailを使用)
    const html = await render(ContactNotificationEmail({ subject, data: { name, tel, email, message } }));

    // ResendのAPIを直接叩く
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Genesis お問い合わせ <${fromEmail}>`,
        to: [toEmail],
        subject: `Webサイトからのお問い合わせ: ${name} 様`,
        html: html,
        reply_to: email,
      }),
    });

    const resendData = (await res.json()) as any;

    if (!res.ok) {
      throw new Error(resendData?.message || 'メール送信に失敗しました');
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
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
