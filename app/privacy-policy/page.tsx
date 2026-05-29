import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Digital Universe Agency",
  description: "Privacy Policy for Digital Universe Agency, including data collection, payment security, cookies, and contact details.",
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicy() {
  return (
      <div className="min-h-screen bg-[#070e1a] text-neutral-300 py-24 px-6 font-sans selection:bg-[#3d7ec7]/30">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-[#3d7ec7] hover:text-[#5a9de0] transition-colors mb-12 group">
            <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-neutral-500 mb-12">Last Updated: February 20, 2025</p>

          <div className="space-y-8 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when you use our website or services. This may include your name, email address, phone number, company details, and any other information you choose to provide during the project inquiry or checkout process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to deliver, maintain, and improve our services. This includes communicating with you about your projects, processing secure payments, sending administrative messages, and providing customer support.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment data is encrypted and securely processed by our payment gateways; we do not store your credit card details directly.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Information</h2>
              <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates for the purposes outlined above.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking</h2>
              <p>Our website may use &quot;cookies&quot; to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
              <address className="not-italic mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                Email: <a href="mailto:hello@digitaluniverse.agency" className="text-[#3d7ec7] hover:underline">hello@digitaluniverse.agency</a><br />
                Phone: +971 52 274 0909
              </address>
            </section>
          </div>
        </div>
      </div>
  )
}
