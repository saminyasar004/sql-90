import { Logo } from "@/components/common/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TermsPage() {
	return (
		<div className="min-h-screen h-auto bg-background relative pb-5">
			{/* Header */}
			<header className="border-b bg-primary text-primary-foreground backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div>
								<Logo />
							</div>
						</div>
						<div className="flex flex-row gap-5 items-center">
							<a
								target="_blank"
								href="https://www.amazon.com/dp/B0FBM6WGZX/"
							>
								<button className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors">
									Get the Book
								</button>
							</a>

							<Badge className="bg-white text-[#007C7C] hover:border-white hover:text-white font-medium rounded-md">
								Join data professionals worldwide
							</Badge>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8 h-auto min-h-[90vh]">
				<div className="prose prose-sm max-w-none">
					<h1 className="text-4xl font-bold text-foreground mb-2">
						Terms and Conditions
					</h1>
					<p className="text-muted-foreground mb-8">
						Last updated: October 2025
					</p>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							1. Agreement to Terms
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							By accessing and using SQL90 ("the Service"), you
							accept and agree to be bound by the terms and
							provision of this agreement. If you do not agree to
							abide by the above, please do not use this service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							2. Use License
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							Permission is granted to temporarily download one
							copy of the materials (information or software) on
							SQL90 for personal, non-commercial transitory
							viewing only. This is the grant of a license, not a
							transfer of title, and under this license you may
							not:
						</p>
						<ul className="list-disc list-inside space-y-2 text-foreground/90 mb-4">
							<li>Modifying or copying the materials</li>
							<li>
								Using the materials for any commercial purpose
								or for any public display
							</li>
							<li>
								Attempting to decompile or reverse engineer any
								software contained on SQL90
							</li>
							<li>
								Removing any copyright or other proprietary
								notations from the materials
							</li>
							<li>
								Transferring the materials to another person or
								"mirroring" the materials on any other server
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							3. Disclaimer
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							The materials on SQL90 are provided on an 'as is'
							basis. SQL90 makes no warranties, expressed or
							implied, and hereby disclaims and negates all other
							warranties including, without limitation, implied
							warranties or conditions of merchantability, fitness
							for a particular purpose, or non-infringement of
							intellectual property or other violation of rights.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							4. Limitations
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							In no event shall SQL90 or its suppliers be liable
							for any damages (including, without limitation,
							damages for loss of data or profit, or due to
							business interruption) arising out of the use or
							inability to use the materials on SQL90, even if
							SQL90 or an authorized representative has been
							notified orally or in writing of the possibility of
							such damage.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							5. Accuracy of Materials
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							The materials appearing on SQL90 could include
							technical, typographical, or photographic errors.
							SQL90 does not warrant that any of the materials on
							its website are accurate, complete, or current.
							SQL90 may make changes to the materials contained on
							its website at any time without notice.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							6. Links
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							SQL90 has not reviewed all of the sites linked to
							its website and is not responsible for the contents
							of any such linked site. The inclusion of any link
							does not imply endorsement by SQL90 of the site. Use
							of any such linked website is at the user's own
							risk.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							7. Modifications
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							SQL90 may revise these terms of service for its
							website at any time without notice. By using this
							website, you are agreeing to be bound by the then
							current version of these terms of service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							8. Governing Law
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							These terms and conditions are governed by and
							construed in accordance with the laws of the
							jurisdiction in which SQL90 operates, and you
							irrevocably submit to the exclusive jurisdiction of
							the courts in that location.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							9. Contact Information
						</h2>
						<p className="text-foreground/90 leading-relaxed">
							If you have any questions about these Terms and
							Conditions, please contact us at support@sql90.com.
						</p>
					</section>
				</div>
			</main>

			{/* Footer */}
			<footer className="border-t bg-primary w-full">
				<div className="container mx-auto px-4 py-6">
					<div className="text-center text-sm text-white">
						<p>
							© {new Date().getFullYear()} SQL90. All rights
							reserved. Built for data professionals who love SQL.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
