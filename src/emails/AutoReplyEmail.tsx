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
  
  // Premium Theme Configuration
  const theme = {
    primaryColor: isLiver ? '#fff97e' : '#39385c',      
    accentColor: isLiver ? '#a1ff59' : '#d0524f',       
    bgColor: isLiver ? '#0f172a' : '#f9fafb',           
    cardBgColor: isLiver ? '#1e293b' : '#ffffff',
    borderColor: isLiver ? '#334155' : '#e5e7eb',
    textColor: isLiver ? '#f8fafc' : '#111827',
    subTextColor: isLiver ? '#94a3b8' : '#6b7280',
    title: 'お問い合わせ',
    // Header Image URL
    bannerUrl: isLiver 
      ? 'https://genesis-llc.co.jp/images/liver_bg_base.png' 
      : 'https://genesis-llc.co.jp/images/corporate_bg_base.png',
  };

  const mainStyle = {
    backgroundColor: theme.bgColor,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    padding: '40px 0',
  };

  const containerStyle = {
    margin: '0 auto',
    padding: '0',
    backgroundColor: theme.cardBgColor,
    borderRadius: '12px',
    border: `1px solid ${theme.borderColor}`,
    overflow: 'hidden',
    maxWidth: '600px',
    boxShadow: isLiver 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' 
      : '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
  };

  const headerSectionStyle = {
    backgroundColor: theme.primaryColor,
    padding: '50px 20px',
    textAlign: 'center' as const,
    backgroundImage: `url(${theme.bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottom: `4px solid ${theme.accentColor}`,
  };

  const headerTitleContainerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '8px',
    backdropFilter: 'blur(4px)', // Fallback for clients that support it
  };

  const headerTitleStyle = {
    color: '#ffffff', // Always white for contrast against dark overlay
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0',
    letterSpacing: '3px',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const contentSectionStyle = {
    padding: '30px 40px',
  };

  const textStyle = {
    color: theme.textColor,
    fontSize: '15px',
    lineHeight: '24px',
    margin: '16px 0',
  };

  const labelStyle = {
    color: theme.subTextColor,
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginTop: '24px',
    marginBottom: '4px',
  };

  const valueStyle = {
    color: theme.textColor,
    fontSize: '16px',
    fontWeight: '500',
    margin: '0',
    padding: '12px',
    backgroundColor: isLiver ? '#0f172a' : '#f3f4f6',
    borderRadius: '6px',
    borderLeft: `4px solid ${theme.primaryColor}`,
  };

  const messageBoxStyle = {
    ...valueStyle,
    whiteSpace: 'pre-wrap' as const,
    lineHeight: '1.6',
    padding: '16px',
  };

  const footerStyle = {
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: isLiver ? '#0f172a' : '#f9fafb',
    borderTop: `1px solid ${theme.borderColor}`,
  };

  const footerTextStyle = {
    color: theme.subTextColor,
    fontSize: '12px',
    margin: '0',
  };

  return (
    <Html>
      <Head />
      <Preview>お問い合わせありがとうございます</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Header Section with Image Background */}
          <Section style={headerSectionStyle}>
            <div style={headerTitleContainerStyle}>
              <Heading style={headerTitleStyle}>{theme.title}</Heading>
            </div>
          </Section>

          {/* Content Section */}
          <Section style={contentSectionStyle}>
            <Text style={{ ...textStyle, fontSize: '18px', fontWeight: 'bold' }}>
              {data.name} 様
            </Text>
            
            <Text style={textStyle}>
              この度はGenesis合同会社へお問い合わせいただき、誠にありがとうございます。<br />
              以下の内容でお問い合わせを受け付けいたしました。<br />
              内容を確認次第、担当者よりご連絡させていただきますので、今しばらくお待ちください。
            </Text>

            <Hr style={{ borderColor: theme.borderColor, margin: '24px 0' }} />

            <Text style={labelStyle}>お問い合わせ種別</Text>
            <Text style={valueStyle}>{getSubjectText(subject)}</Text>

            <Text style={labelStyle}>お名前</Text>
            <Text style={valueStyle}>{data.name} 様</Text>

            <Text style={labelStyle}>電話番号</Text>
            <Text style={valueStyle}>{data.tel}</Text>

            <Text style={labelStyle}>メールアドレス</Text>
            <Text style={valueStyle}>{data.email}</Text>

            <Text style={labelStyle}>お問い合わせ内容</Text>
            <Text style={messageBoxStyle}>{data.message}</Text>
          </Section>

          {/* Footer Section */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Genesis合同会社<br />
              https://genesis-llc.co.jp
            </Text>
            <Text style={{ ...footerTextStyle, marginTop: '8px' }}>
              © Genesis LLC. All rights reserved.
            </Text>
            <Text style={{ ...footerTextStyle, marginTop: '4px' }}>
              このメールに心当たりのない場合は、破棄していただきますようお願いいたします。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
