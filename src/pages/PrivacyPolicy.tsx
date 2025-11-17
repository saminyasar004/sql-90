import { Logo } from "@/components/common/logo";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
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
						<Badge
							variant="secondary"
							className="hidden sm:flex text-primary"
						>
							Join 10,000+ data professionals
						</Badge>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8 h-auto min-h-[90vh]">
				<div className="prose prose-sm max-w-none">
					<h1 className="text-4xl font-bold text-foreground mb-2">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground mb-8">
						Last updated: October 2025
					</p>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							1. Introduction
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							SQL90 ("we," "us," "our," or "Company") is committed
							to protecting your privacy. This Privacy Policy
							explains how we collect, use, disclose, and
							safeguard your information when you visit our
							website and use our services.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							2. Information We Collect
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							We may collect information about you in a variety of
							ways. The information we may collect on the site
							includes:
						</p>

						<h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
							Personal Data
						</h3>
						<p className="text-foreground/90 leading-relaxed mb-4">
							Personally identifiable information, such as your
							name, shipping address, email address, and telephone
							number, and demographic information, such as your
							age, gender, hometown, and interests, that you
							voluntarily give to us when you register with the
							site or when you choose to participate in various
							activities related to the site.
						</p>

						<h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
							Financial and Billing Information
						</h3>
						<p className="text-foreground/90 leading-relaxed mb-4">
							Financial information, such as funds used to
							purchase, and credit card numbers is used only to
							bill you for products and services. For security, we
							do not store complete credit card information.
						</p>

						<h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
							Data From Beacons
						</h3>
						<p className="text-foreground/90 leading-relaxed mb-4">
							We may use beacons, pixels, and similar tracking
							technology to track the activities of users of the
							site and to remember user preferences.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							3. Use of Your Information
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							Having accurate information about you permits us to
							provide you with a smooth, efficient, and customized
							experience. Specifically, we may use information
							collected about you via the site to:
						</p>
						<ul className="list-disc list-inside space-y-2 text-foreground/90 mb-4">
							<li>Create and manage your account</li>
							<li>Email you regarding your account or order</li>
							<li>
								Fulfill and send you information related to your
								purchase
							</li>
							<li>
								Generate a personal profile about you so that
								future visits to the site will be personalized
							</li>
							<li>
								Increase the efficiency and operation of the
								site
							</li>
							<li>
								Monitor and analyze usage and trends to improve
								your experience with the site
							</li>
							<li>Notify you of updates to the site</li>
							<li>
								Offer new products, services, and/or
								recommendations to you
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							4. Disclosure of Your Information
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							We may share your information with third parties in
							certain situations, including when necessary to
							provide services you've requested, comply with legal
							obligations, or protect our rights and safety.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							5. Security of Your Information
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							We use administrative, technical, and physical
							security measures to protect your personal
							information. However, no method of transmission over
							the Internet or method of electronic storage is 100%
							secure. While we strive to use commercially
							acceptable means to protect your personal
							information, we cannot guarantee its absolute
							security.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							6. Contact Us
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-4">
							If you have questions or comments about this Privacy
							Policy, please contact us at:
						</p>
						<div className="bg-muted p-4 rounded-lg mt-4">
							<p className="text-foreground font-semibold">
								SQL90
							</p>
							<p className="text-foreground/90">
								Email: support@sql90.com
							</p>
							<p className="text-foreground/90">
								Website: sql90.com
							</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
							7. Changes to This Privacy Policy
						</h2>
						<p className="text-foreground/90 leading-relaxed mb-12">
							SQL90 reserves the right to modify this privacy
							policy at any time. Changes and clarifications will
							take effect immediately upon their posting to the
							website. If we make material changes to this policy,
							we will notify you here that it has been updated, so
							that you are aware of what information we collect,
							how we use it, and under what circumstances, if any,
							we use and/or disclose it.
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
