import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Digital Universe Agency",
  description: "Terms of Service for Digital Universe Agency, including service scope, payments, intellectual property, liability, and contact details.",
  alternates: {
    canonical: "/terms-of-service",
  },
}

export default function TermsOfService() {
  return (
    <>
      <div className="min-h-screen bg-[#070e1a] text-neutral-300 py-24 px-6 font-sans selection:bg-[#3d7ec7]/30">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-[#3d7ec7] hover:text-[#5a9de0] transition-colors mb-12 group">
            <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-neutral-500 mb-12">Last Updated: February 20, 2025</p>

          <div className="space-y-8 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>These Terms of Service constitute a legally binding agreement made between you and Digital Universe, located in Dubai, UAE, concerning your access to and use of our website and digital services. By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Digital Services & Payments</h2>
              <p>We offer premium digital services including Web Development, SEO, Digital Marketing, and 3D Animation. All project scopes, timelines, and payment milestones will be mutually agreed upon prior to commencement. Payments made through our &quot;Secure Checkout&quot; are processed safely. We reserve the right to refuse service or cancel projects in the event of fraudulent activity.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
              <p>Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the &quot;Content&quot;) are owned or controlled by us, and are protected by copyright and trademark laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Governing Law & Dispute Resolution</h2>
              <p>These conditions are governed by and interpreted following the laws of the United Arab Emirates (UAE). Digital Universe and yourself both agree to submit to the exclusive jurisdiction of the courts of Dubai, UAE, to resolve any legal matter arising from these terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, or loss of data arising from your use of the site or our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
              <p>For any complaints or further inquiries regarding these Terms, please contact us at:</p>
              <address className="not-italic mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                Email: <a href="mailto:hello@digitaluniverse.agency" className="text-[#3d7ec7] hover:underline">hello@digitaluniverse.agency</a><br />
                Phone: +971 52 274 0909
              </address>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
