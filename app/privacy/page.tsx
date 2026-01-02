import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy - Course Centre",
  description: "Our Privacy Policy explains how we collect, use, and protect your personal information in compliance with GDPR.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
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
                  <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Course Centre ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                  <p>
                    We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws. By using our services, you consent to the collection and use of information in accordance with this policy.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h4 className="font-semibold mt-4">2.1 Personal Information</h4>
                  <p>We may collect the following personal information:</p>
                  <ul>
                    <li>Name and contact details (email, phone number, address)</li>
                    <li>Date of birth and nationality</li>
                    <li>Educational background and qualifications</li>
                    <li>Application documents and personal statements</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>IP address and device information</li>
                    <li>Cookies and tracking data (with your consent)</li>
                  </ul>

                  <h4 className="font-semibold mt-6">2.2 How We Collect Information</h4>
                  <ul>
                    <li>Directly from you when you register, apply, or contact us</li>
                    <li>Through cookies and similar technologies</li>
                    <li>From third-party services (e.g., universities, payment processors)</li>
                    <li>Through automated means (e.g., website analytics)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* How We Use Information */}
              <Card>
                <CardHeader>
                  <CardTitle>3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We use your personal information for the following purposes:</p>
                  <ul>
                    <li>To process and manage your course applications</li>
                    <li>To communicate with you about your applications and services</li>
                    <li>To provide customer support and respond to inquiries</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To improve our website and services</li>
                    <li>To comply with legal obligations</li>
                    <li>To prevent fraud and ensure security</li>
                    <li>To analyze website usage and performance</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Legal Basis */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Legal Basis for Processing</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We process your personal data based on the following legal bases:</p>
                  <ul>
                    <li><strong>Consent:</strong> When you have given clear consent for specific purposes (e.g., marketing)</li>
                    <li><strong>Contract:</strong> To fulfill our contractual obligations (e.g., processing applications)</li>
                    <li><strong>Legal Obligation:</strong> To comply with legal requirements</li>
                    <li><strong>Legitimate Interests:</strong> For our legitimate business interests (e.g., website security, analytics)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Data Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Data Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We may share your information with:</p>
                  <ul>
                    <li><strong>Universities and Educational Institutions:</strong> To process your applications</li>
                    <li><strong>Service Providers:</strong> Third-party companies that help us operate (e.g., hosting, payment processing)</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                  <p className="mt-4">
                    We do not sell your personal information to third parties for marketing purposes.
                  </p>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card id="cookies">
                <CardHeader>
                  <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We use cookies and similar technologies to:</p>
                  <ul>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Ensure website security and functionality</li>
                  </ul>
                  <p className="mt-4">
                    You can manage your cookie preferences at any time through our{" "}
                    <Link href="/cookies" className="text-[#1E3A8A] hover:underline">
                      Cookie Preferences
                    </Link>{" "}
                    page or your browser settings.
                  </p>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information, including:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure authentication and access controls</li>
                    <li>Regular security assessments and updates</li>
                    <li>Staff training on data protection</li>
                    <li>Limited access to personal data on a need-to-know basis</li>
                  </ul>
                  <p className="mt-4">
                    However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                  </p>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Your Rights Under GDPR</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>You have the following rights regarding your personal data:</p>
                  <ul>
                    <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                    <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us at{" "}
                    <a href="mailto:privacy@coursecentre.co.uk" className="text-[#1E3A8A] hover:underline">
                      privacy@coursecentre.co.uk
                    </a>
                    {" "}or use our{" "}
                    <Link href="/dashboard/data-request" className="text-[#1E3A8A] hover:underline">
                      Data Request Portal
                    </Link>.
                  </p>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>We retain your personal data only for as long as necessary to:</p>
                  <ul>
                    <li>Fulfill the purposes for which it was collected</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                  </ul>
                  <p className="mt-4">
                    Generally, we retain application data for 7 years after the end of the academic relationship, unless you request earlier deletion or we are required to retain it longer by law.
                  </p>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>10. International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Your data may be transferred to and processed in countries outside the European Economic Area (EEA). 
                    We ensure appropriate safeguards are in place, such as:
                  </p>
                  <ul>
                    <li>Standard Contractual Clauses approved by the European Commission</li>
                    <li>Adequacy decisions by the European Commission</li>
                    <li>Other legally recognized transfer mechanisms</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle>11. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Our services are not directed to individuals under 16 years of age. We do not knowingly collect 
                    personal information from children. If you believe we have collected information from a child, 
                    please contact us immediately.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>12. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes 
                    by posting the new policy on this page and updating the "Last updated" date. We encourage you to 
                    review this policy periodically.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>13. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Data Protection Officer:</strong><br />
                      Course Centre<br />
                      Email: <a href="mailto:privacy@coursecentre.co.uk" className="text-[#1E3A8A] hover:underline">privacy@coursecentre.co.uk</a>
                    </p>
                    <p>
                      <strong>General Inquiries:</strong><br />
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


