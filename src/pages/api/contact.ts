import type { APIRoute } from 'astro';
import { getContactTemplateHtml, getSubjectText } from '../../emails/ContactTemplate';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fromEmail = import.meta.env.FROM_EMAIL || 'info@domain.co.jp';
    const toEmail = import.meta.env.TO_EMAIL || 'info@domain.co.jp';
    const apiKey = import.meta.env.CONTACT_RESEND_API_KEY;

    // プレースホルダーを置換してHTMLを生成（新しい関数化されたテンプレートを使用）
    const html = getContactTemplateHtml(subject, {
      name,
      tel,
      email,
      message
    });

    // fetchを使ってResend APIを直接呼び出す
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

    const resendData = await res.json();

    if (!res.ok) {
      throw new Error(resendData.message || 'メール送信に失敗しました');
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
