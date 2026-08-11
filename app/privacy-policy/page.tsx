import React from 'react';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <MainLayout>
      {/* Main container with pitch black background and padding */}
      <div className="bg-background min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Back to Home Button */}
        <div className="w-full max-w-4xl mb-8">
          <Link href="/roadmap" passHref>
            <Button 
              className="btn-premium bg-primary/10 backdrop-blur-sm border border-primary/20 hover:border-primary/40 text-primary-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Glassmorphism Card */}
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl shadow-primary/10">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">Privacy Policy for PathShala AI</h1>
          <p className="text-sm text-gray-400 mb-8">Last Updated: September 21, 2025</p>

          {/* Prose classes for dark mode styling */}
          <div className="prose prose-lg prose-invert text-gray-300 max-w-none">
            <p>Welcome to PathShala AI. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.</p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Your name and email address, which you provide during account registration.</li>
              <li><strong>Professional & Profile Information:</strong> Details you provide during onboarding, such as your bio, industry, experience level, skills, LinkedIn profile, and GitHub profile.</li>
              <li><strong>User-Generated Content:</strong> Information you create on our platform, including AI-generated roadmaps, quiz results, resume content, and cover letters.</li>
              <li><strong>Usage Data:</strong> We may collect information on how you interact with our website, such as the features you use and the time you spend on the platform.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our services.</li>
              <li>Personalize your experience by generating tailored job suggestions and learning roadmaps.</li>
              <li>Power our AI features, such as the chatbot and resume builder.</li>
              <li>Process transactions for premium services.</li>
              <li>Improve and optimize our platform and services.</li>
            </ul>

            <h2>Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with third-party service providers only to the extent necessary to provide our services, such as:</p>
            <ul>
              <li>AI Service Providers (Google): To power our generative AI features.</li>
              <li>Payment Processors: To handle payments for subscriptions.</li>
            </ul>

            <h2>Data Security</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, update, or request deletion of your personal data through your profile settings or by contacting us.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at primusvlog@gmail.com</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;