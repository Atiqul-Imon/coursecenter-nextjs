import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service - Course Centre",
  description: "Read our Terms of Service to understand the rules and regulations for using Course Centre's services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
            </div>
            <p className="text-white/90 text-lg">
              Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="section-padding bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    By accessing or using Course Centre's website and services, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our services.
                  </p>
                  <p className="mt-4">
                    We reserve the right to modify these terms at any time. Your continued use of our services after changes 
                    constitutes acceptance of the modified terms.
                  </p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Our Services</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>Course Centre provides:</p>
                  <ul>
                    <li>Educational consulting and student recruitment services</li>
                    <li>Course and university information and listings</li>
                    <li>Application processing and management</li>
                    <li>Consultation booking services</li>
                    <li>Student support and guidance</li>
                  </ul>
                  <p className="mt-4">
                    We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
                  </p>
                </CardContent>
              </Card>

              {/* User Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>When you create an account, you agree to:</p>
                  <ul>
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information as necessary</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                  <p className="mt-4">
                    We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                  </p>
                </CardContent>
              </Card>

              {/* Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Course Applications</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>When submitting applications through our platform:</p>
                  <ul>
                    <li>You must provide accurate and truthful information</li>
                    <li>You are responsible for ensuring you meet course requirements</li>
                    <li>We act as an intermediary and do not guarantee admission</li>
                    <li>Application decisions are made solely by educational institutions</li>
                    <li>Fees may apply and are non-refundable unless otherwise stated</li>
                  </ul>
                  <p className="mt-4">
                    We are not responsible for application rejections or delays caused by incomplete or inaccurate information.
                  </p>
                </CardContent>
              </Card>

              {/* Fees and Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Fees and Payments</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>Some services may require payment:</p>
                  <ul>
                    <li>Fees are clearly stated before you commit to a service</li>
                    <li>All fees are in GBP unless otherwise specified</li>
                    <li>Payment must be made through approved payment methods</li>
                    <li>Refunds are subject to our refund policy</li>
                    <li>We reserve the right to change fees with notice</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    All content on our website, including text, graphics, logos, and software, is the property of Course Centre 
                    or its licensors and is protected by copyright and trademark laws.
                  </p>
                  <p className="mt-4">
                    You may not reproduce, distribute, modify, or create derivative works from our content without written permission.
                  </p>
                </CardContent>
              </Card>

              {/* User Content */}
              <Card>
                <CardHeader>
                  <CardTitle>7. User Content</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>When you submit content (e.g., applications, documents, messages):</p>
                  <ul>
                    <li>You retain ownership of your content</li>
                    <li>You grant us a license to use, store, and process your content to provide services</li>
                    <li>You represent that you have the right to submit the content</li>
                    <li>You agree not to submit illegal, harmful, or offensive content</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Prohibited Uses */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Prohibited Uses</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>You agree not to:</p>
                  <ul>
                    <li>Use our services for any illegal purpose</li>
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit viruses, malware, or harmful code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                    <li>Use automated systems to access our services without permission</li>
                    <li>Impersonate others or provide false information</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Disclaimers */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Disclaimers</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Our services are provided "as is" without warranties of any kind. We do not guarantee:
                  </p>
                  <ul>
                    <li>Uninterrupted or error-free service</li>
                    <li>Accuracy or completeness of information</li>
                    <li>Admission to any educational institution</li>
                    <li>Results from using our services</li>
                  </ul>
                  <p className="mt-4">
                    Educational institutions are independent entities, and we are not responsible for their decisions or policies.
                  </p>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    To the maximum extent permitted by law, Course Centre shall not be liable for any indirect, incidental, 
                    special, consequential, or punitive damages, including loss of profits, data, or opportunities.
                  </p>
                  <p className="mt-4">
                    Our total liability for any claims shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              {/* Indemnification */}
              <Card>
                <CardHeader>
                  <CardTitle>11. Indemnification</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    You agree to indemnify and hold harmless Course Centre, its officers, employees, and agents from any claims, 
                    damages, losses, or expenses arising from:
                  </p>
                  <ul>
                    <li>Your use of our services</li>
                    <li>Your violation of these terms</li>
                    <li>Your violation of any rights of others</li>
                    <li>Content you submit</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card>
                <CardHeader>
                  <CardTitle>12. Termination</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We may terminate or suspend your access to our services:</p>
                  <ul>
                    <li>If you violate these terms</li>
                    <li>If you engage in fraudulent activity</li>
                    <li>For any reason with or without notice</li>
                  </ul>
                  <p className="mt-4">
                    Upon termination, your right to use our services will immediately cease, but provisions that should survive 
                    termination will remain in effect.
                  </p>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>13. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive 
                    jurisdiction of the courts of England and Wales.
                  </p>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>14. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>For questions about these Terms of Service, please contact us:</p>
                  <div className="mt-4">
                    <p>
                      <strong>Course Centre</strong><br />
                      Email: <a href="mailto:info@coursecentre.co.uk" className="text-[#1E3A8A] hover:underline">info@coursecentre.co.uk</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


