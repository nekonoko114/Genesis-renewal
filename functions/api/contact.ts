import { getContactTemplateHtml } from '../../src/emails/ContactTemplate';

export interface Env {
  CONTACT_RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.formData();
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

    // 環境変数の取得（フォールバック付き）
    const fromEmail = context.env.FROM_EMAIL || 'info@genesis-llc.co.jp';
    const toEmail = context.env.TO_EMAIL || 'info@genesis-llc.co.jp';
    const apiKey = context.env.CONTACT_RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'サーバーのAPIキー設定が不足しています。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // HTMLメールの生成
    const html = getContactTemplateHtml(subject, { name, tel, email, message });

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

    const resendData = await res.json();

    if (!res.ok) {
      throw new Error(resendData.message || 'メール送信に失敗しました');
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
