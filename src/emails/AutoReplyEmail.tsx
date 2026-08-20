import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AutoReplyEmailProps {
  subject: string;
  data: {
    name: string;
    tel: string;
    email: string;
    message: string;
  };
}

const getSubjectText = (val: string) => {
  const map: Record<string, string> = {
    corporate_service: 'サービス導入・協業に関するご相談',
    corporate_recruit: '人材採用・パートナーシップのご相談',
    corporate_other: 'その他（コーポレート関連）',
    liver_audition: 'ライバー所属・オーディション応募',
    liver_business: '企業案件・コラボレーションのご相談',
    liver_other: 'その他（ライバーマネジメント関連）',
  };
  return map[val] || val;
};

export const AutoReplyEmail = ({ subject, data }: AutoReplyEmailProps) => {
  const isLiver = subject.startsWith('liver_');
  
  // Dynamic Theming: Gorgeous Luxury Gold (Corporate) vs Super Cute Sparkle Pop (Liver)
  const colors = {
    primary: '#0f172a',
    accent: isLiver ? '#ff758c' : '#d97706', // Sweet Coral Pink vs Rich Gold
    accentSecondary: isLiver ? '#c084fc' : '#fbbf24', // Pastel Lilac vs Champagne Gold
    accentTertiary: isLiver ? '#38bdf8' : '#f59e0b', // Soft Cyan vs Amber
    accentYellow: isLiver ? '#fde047' : '#d4af37', // Sparkle Yellow vs Metallic Gold
    textDark: '#0f172a',
    textMuted: '#64748b',
    textLight: '#94a3b8',
    cardBg: '#ffffff',
    sectionBg: isLiver ? '#fff5f8' : '#fafaf9',
    border: isLiver ? '#fecdd3' : '#e7e5e4',
    borderLight: isLiver ? '#ffe4e6' : '#f5f5f4',
    bannerUrl: isLiver 
      ? 'https://genesis-llc.co.jp/images/liver_bg_base.png' 
      : 'https://genesis-llc.co.jp/images/corporate_bg_base.png',
  };

  const mainStyle = {
    backgroundColor: '#f1f5f9',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    padding: '40px 16px',
    color: colors.textDark,
  };

  const containerStyle = {
    margin: '0 auto',
    padding: '0',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
    maxWidth: '580px',
    boxShadow: isLiver 
      ? '0 8px 30px -4px rgba(255, 117, 140, 0.2)' 
      : '0 8px 30px -4px rgba(217, 119, 6, 0.12)',
  };

  // Header with Photo Background & Bottom Overlay Card
  const headerSectionStyle = {
    padding: '120px 0 0 0',
    textAlign: 'center' as const,
    backgroundImage: `url(${colors.bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#0b0f19',
    borderBottom: `3px solid ${colors.accent}`,
  };

  const headerCardStyle = {
    background: isLiver 
      ? 'linear-gradient(180deg, rgba(30, 27, 75, 0.80) 0%, rgba(24, 15, 38, 0.96) 100%)'
      : 'linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(10, 15, 29, 0.97) 100%)',
    backgroundColor: 'rgba(11, 15, 25, 0.90)',
    display: 'block',
    padding: '12px 24px',
    borderTop: isLiver 
      ? '1px solid rgba(255, 117, 140, 0.5)' 
      : '1px solid rgba(251, 191, 36, 0.4)',
    textAlign: 'center' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const contentStyle = {
    padding: '36px 32px',
    backgroundColor: '#ffffff',
  };

  const greetingNameStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: colors.textDark,
    margin: '0 0 16px 0',
    letterSpacing: '0.5px',
  };

  const introTextStyle = {
    fontSize: '14px',
    lineHeight: '26px',
    color: '#334155',
    margin: '0 0 28px 0',
  };

  // Structured Summary Card
  const summaryCardStyle = {
    backgroundColor: colors.sectionBg,
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
    marginBottom: '28px',
  };

  const summaryHeaderStyle = {
    padding: '12px 18px',
    backgroundColor: isLiver ? '#ffe4e6' : '#f5f5f4',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
  };

  const summaryHeaderTextStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: isLiver ? '#e11d48' : '#78716c',
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    margin: '0',
  };

  const rowStyle = {
    padding: '14px 18px',
    borderBottom: `1px solid ${colors.borderLight}`,
  };

  const lastRowStyle = {
    padding: '14px 18px',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: '0.5px',
    margin: '0 0 4px 0',
    textTransform: 'uppercase' as const,
  };

  const valueStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textDark,
    margin: '0',
    lineHeight: '20px',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: isLiver ? '#ffe4e6' : '#fef3c7',
    color: isLiver ? '#e11d48' : '#92400e',
    border: isLiver ? '1px solid #fecdd3' : '1px solid #fde68a',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px',
  };

  const messageBoxStyle = {
    fontSize: '14px',
    lineHeight: '24px',
    color: colors.textDark,
    backgroundColor: '#ffffff',
    padding: '14px 16px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    borderLeft: `3px solid ${colors.accent}`,
    margin: '6px 0 0 0',
    whiteSpace: 'pre-wrap' as const,
  };

  const noticeBoxStyle = {
    padding: '16px',
    backgroundColor: isLiver ? '#fff1f2' : '#f0fdf4',
    borderRadius: '8px',
    border: isLiver ? '1px solid #fecdd3' : '1px solid #bbf7d0',
    marginBottom: '28px',
  };

  const noticeTextStyle = {
    fontSize: '13px',
    lineHeight: '22px',
    color: isLiver ? '#9f1239' : '#166534',
    margin: '0',
  };

  const footerStyle = {
    padding: '24px 32px',
    textAlign: 'center' as const,
    backgroundColor: '#0b0f19',
    color: colors.textLight,
  };

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>{`
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
          @media (prefers-color-scheme: dark) {
            body, .email-body { background-color: #0b0f19 !important; color: #f8fafc !important; }
            .email-container { background-color: #131b2e !important; border-color: #1e293b !important; }
            .email-content { background-color: #131b2e !important; }
            .email-header-card { background-color: #0b0f19 !important; background: #0b0f19 !important; border-top-color: ${isLiver ? 'rgba(255, 117, 140, 0.5)' : 'rgba(251, 191, 36, 0.5)'} !important; }
            .email-header-title { color: #ffffff !important; text-shadow: 0 0 16px ${isLiver ? 'rgba(255, 117, 140, 0.6)' : 'rgba(245, 158, 11, 0.5)'}, 0 2px 6px rgba(0,0,0,0.9) !important; }
            .email-greeting { color: #ffffff !important; }
            .email-intro { color: #cbd5e1 !important; }
            .email-summary-card { background-color: #0b0f19 !important; border-color: #1e293b !important; }
            .email-summary-header { background-color: #1e293b !important; border-color: #334155 !important; }
            .email-summary-header-text { color: ${isLiver ? '#f472b6' : '#fbbf24'} !important; }
            .email-summary-row { border-color: #1e293b !important; }
            .email-label { color: #94a3b8 !important; }
            .email-value { color: #ffffff !important; }
            .email-badge { background-color: ${isLiver ? '#4c0519' : '#451a03'} !important; color: ${isLiver ? '#fbcfe8' : '#fef08a'} !important; border-color: ${isLiver ? '#881337' : '#78350f'} !important; }
            .email-message-box { background-color: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
            .email-notice-box { background-color: ${isLiver ? '#4c0519' : '#052e16'} !important; border-color: ${isLiver ? '#881337' : '#14532d'} !important; }
            .email-notice-text { color: ${isLiver ? '#fecdd3' : '#bbf7d0'} !important; }
            .email-footer { background-color: #060911 !important; border-top: 1px solid #1e293b !important; }
            .email-footer-title { color: #f8fafc !important; }
            .email-footer-link { color: #38bdf8 !important; }
            .email-footer-text { color: #64748b !important; }
          }
        `}</style>
      </Head>
      <Preview>【Genesis】お問い合わせを受け付けました</Preview>
      <Body style={mainStyle} className="email-body">
        <Container style={containerStyle} className="email-container">
          {/* Top Decorative Gradient Bar */}
          <div style={{
            height: '4px',
            width: '100%',
            background: isLiver 
              ? 'linear-gradient(90deg, #ff7eb3 0%, #ff758c 25%, #c084fc 50%, #38bdf8 75%, #fde047 100%)'
              : 'linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef3c7 50%, #f59e0b 75%, #b45309 100%)',
            backgroundColor: colors.accent,
          }}></div>

          {/* Header with Photo Background & Bottom Overlay Card */}
          <Section style={headerSectionStyle}>
            <div style={headerCardStyle} className="email-header-card">
              {/* Main Header Title */}
              <Heading className="email-header-title" style={{
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: isLiver ? '800' : '700',
                letterSpacing: isLiver ? '2.5px' : '3px',
                margin: '0 0 10px 0',
                textAlign: 'center' as const,
                textShadow: isLiver 
                  ? '0 0 16px rgba(255, 117, 140, 0.6), 0 2px 6px rgba(0,0,0,0.8)' 
                  : '0 0 16px rgba(245, 158, 11, 0.4), 0 2px 6px rgba(0,0,0,0.8)',
              }}>
                お問い合わせを受け付けました
              </Heading>

              {/* Geometric Motif: Gorgeous Luxury (Corporate) vs Super Cute Sparkle Hearts (Liver) */}
              <div style={{ textAlign: 'center' as const, margin: '2px auto 0 auto', lineHeight: '0' }}>
                {isLiver ? (
                  /* Super Cute Kawaii Sparkle & Hearts Motif */
                  <svg width="320" height="26" viewBox="0 0 320 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '100%' }}>
                    {/* Left Sparkle & Heart Trail */}
                    <path d="M12 13 L14 9 L18 11 L14 13 L18 15 L14 17 Z" fill="#fde047" />
                    <circle cx="28" cy="13" r="2" fill="#38bdf8" />
                    
                    {/* Left Cute Mini Heart */}
                    <path d="M42 14.5 C39 10 33 11 33 15 C33 18 42 22 42 22 C42 22 51 18 51 15 C51 11 45 10 42 14.5 Z" fill="#ff758c" />
                    
                    {/* Sparkle 4-Point Star */}
                    <g transform="translate(64, 13)">
                      <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="#c084fc" />
                    </g>

                    {/* Cute Pastel Beads */}
                    <circle cx="80" cy="13" r="3" fill="#38bdf8" />
                    <circle cx="92" cy="13" r="2" fill="#fde047" />
                    <circle cx="104" cy="13" r="3.5" fill="#ff758c" />
                    
                    {/* Sparkle 4-Point Star Yellow */}
                    <g transform="translate(122, 13)">
                      <path d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z" fill="#fde047" />
                    </g>
                    <circle cx="140" cy="13" r="2.5" fill="#c084fc" />

                    {/* Center Big Sweet Heart with Sparkle Wings */}
                    <g transform="translate(160, 13)">
                      {/* Outer Glow Circle */}
                      <circle cx="0" cy="0" r="10" stroke="rgba(255, 117, 140, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Sweet Center Heart */}
                      <path d="M0 2.5 C-3 -3 -9 -2 -9 2.5 C-9 6.5 0 11 0 11 C0 11 9 6.5 9 2.5 C9 -2 3 -3 0 2.5 Z" fill="#ff758c" />
                      <circle cx="-3" cy="1" r="1" fill="#ffffff" opacity="0.8" />
                    </g>

                    {/* Right Cute Pastel Trail */}
                    <circle cx="180" cy="13" r="2.5" fill="#c084fc" />
                    {/* Sparkle 4-Point Star Yellow */}
                    <g transform="translate(198, 13)">
                      <path d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z" fill="#fde047" />
                    </g>
                    
                    <circle cx="216" cy="13" r="3.5" fill="#ff758c" />
                    <circle cx="228" cy="13" r="2" fill="#fde047" />
                    <circle cx="240" cy="13" r="3" fill="#38bdf8" />

                    {/* Sparkle 4-Point Star */}
                    <g transform="translate(256, 13)">
                      <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="#c084fc" />
                    </g>

                    {/* Right Cute Mini Heart */}
                    <path d="M278 14.5 C275 10 269 11 269 15 C269 18 278 22 278 22 C278 22 287 18 287 15 C287 11 281 10 278 14.5 Z" fill="#ff758c" />
                    
                    <circle cx="292" cy="13" r="2" fill="#38bdf8" />
                    <path d="M308 13 L306 9 L302 11 L306 13 L302 15 L306 17 Z" fill="#fde047" />
                  </svg>
                ) : (
                  /* Super Gorgeous Luxury Executive Gold Motif */
                  <svg width="320" height="26" viewBox="0 0 320 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '100%' }}>
                    {/* Left Luxury Filigree Line */}
                    <line x1="10" y1="13" x2="60" y2="13" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" />
                    <circle cx="60" cy="13" r="1.5" fill="#f59e0b" />
                    
                    {/* Left Gold Diamond Chain */}
                    <polygon points="72,13 77,8 82,13 77,18" stroke="#f59e0b" strokeWidth="1.2" fill="rgba(245, 158, 11, 0.2)" />
                    <circle cx="92" cy="13" r="2" fill="#fbbf24" />
                    <polygon points="102,13 108,6 114,13 108,20" fill="#f59e0b" />
                    <polygon points="124,13 130,7 136,13 130,19" fill="#fef08a" />
                    <circle cx="144" cy="13" r="2" fill="#fbbf24" />

                    {/* Center Gorgeous 8-Point Luxury Gold Star */}
                    <g transform="translate(160, 13)">
                      {/* Outer Glow Ring */}
                      <circle cx="0" cy="0" r="10" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
                      {/* 8-Point Star */}
                      <path d="M0 -9L2.5 -2.5L9 0L2.5 2.5L0 9L-2.5 2.5L-9 0L-2.5 -2.5Z" fill="#fbbf24" />
                      <circle cx="0" cy="0" r="2" fill="#ffffff" />
                    </g>

                    {/* Right Gold Diamond Chain */}
                    <circle cx="176" cy="13" r="2" fill="#fbbf24" />
                    <polygon points="184,13 190,7 196,13 190,19" fill="#fef08a" />
                    <polygon points="206,13 212,6 218,13 212,20" fill="#f59e0b" />
                    <circle cx="228" cy="13" r="2" fill="#fbbf24" />
                    <polygon points="238,13 243,8 248,13 243,18" stroke="#f59e0b" strokeWidth="1.2" fill="rgba(245, 158, 11, 0.2)" />

                    {/* Right Luxury Filigree Line */}
                    <circle cx="260" cy="13" r="1.5" fill="#f59e0b" />
                    <line x1="260" y1="13" x2="310" y2="13" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" />
                  </svg>
                )}
              </div>
            </div>
          </Section>

          {/* Content Section */}
          <Section style={contentStyle} className="email-content">
            <Text style={greetingNameStyle} className="email-greeting">
              {data.name} 様
            </Text>
            
            <Text style={introTextStyle} className="email-intro">
              この度はGenesis合同会社へお問い合わせいただき、誠にありがとうございます。<br />
              以下の内容でお問い合わせを正常に受け付けいたしました。<br />
              内容を確認次第、担当者より折り返しご連絡させていただきます。
            </Text>

            {/* Structured Summary Card */}
            <div style={summaryCardStyle} className="email-summary-card">
              <div style={summaryHeaderStyle} className="email-summary-header">
                <Text style={summaryHeaderTextStyle} className="email-summary-header-text">
                  ◆ 受付内容の確認 / Submission Details
                </Text>
              </div>

              <div style={rowStyle} className="email-summary-row">
                <Text style={labelStyle} className="email-label">お問い合わせ種別</Text>
                <div style={{ marginTop: '4px' }}>
                  <span style={badgeStyle} className="email-badge">{getSubjectText(subject)}</span>
                </div>
              </div>

              <div style={rowStyle} className="email-summary-row">
                <Text style={labelStyle} className="email-label">お名前</Text>
                <Text style={valueStyle} className="email-value">{data.name} 様</Text>
              </div>

              <div style={rowStyle} className="email-summary-row">
                <Text style={labelStyle} className="email-label">電話番号</Text>
                <Text style={valueStyle} className="email-value">{data.tel}</Text>
              </div>

              <div style={rowStyle} className="email-summary-row">
                <Text style={labelStyle} className="email-label">メールアドレス</Text>
                <Text style={valueStyle} className="email-value">{data.email}</Text>
              </div>

              <div style={lastRowStyle}>
                <Text style={labelStyle} className="email-label">お問い合わせ内容</Text>
                <Text style={messageBoxStyle} className="email-message-box">{data.message}</Text>
              </div>
            </div>

            {/* Notice / Next Steps */}
            <div style={noticeBoxStyle} className="email-notice-box">
              <Text style={noticeTextStyle} className="email-notice-text">
                <strong>【ご案内】</strong><br />
                通常1〜2営業日以内に担当スタッフよりご連絡いたします。<br />
                万が一返信がない場合は、大変お手数ですが再度お問い合わせいただくか、お電話にてご連絡いただけますと幸いです。
              </Text>
            </div>
          </Section>

          {/* Footer Section */}
          <Section style={footerStyle} className="email-footer">
            <Text style={{ fontSize: '12px', fontWeight: '600', color: '#f8fafc', margin: '0 0 4px 0' }} className="email-footer-title">
              Genesis合同会社
            </Text>
            <Text style={{ fontSize: '11px', color: '#64748b', margin: '0 0 10px 0' }} className="email-footer-link">
              https://genesis-llc.co.jp
            </Text>
            <Text style={{ fontSize: '10px', color: '#475569', margin: '0' }} className="email-footer-text">
              © Genesis LLC. All rights reserved. / このメールに心当たりのない場合は破棄をお願いいたします。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
