import { Routes } from '@angular/router';
import { AboutModernPageComponent } from './pages/about-modern-page/about-modern-page.component';
import { AboutSimplePageComponent } from './pages/about-simple-page/about-simple-page.component';
import { AppDownloadPageComponent } from './pages/app-download-page/app-download-page.component';
import { BlogDetailsPageComponent } from './pages/blog-details-page/blog-details-page.component';
import { BlogGridPageComponent } from './pages/blog-grid-page/blog-grid-page.component';
import { BlogLeftSidebarPageComponent } from './pages/blog-left-sidebar-page/blog-left-sidebar-page.component';
import { BlogRightSidebarPageComponent } from './pages/blog-right-sidebar-page/blog-right-sidebar-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { FeaturesOnePageComponent } from './pages/features-one-page/features-one-page.component';
import { FeaturesTwoPageComponent } from './pages/features-two-page/features-two-page.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { HomeDemoEightComponent } from './pages/home-demo-eight/home-demo-eight.component';
import { HomeDemoFiveComponent } from './pages/home-demo-five/home-demo-five.component';
import { HomeDemoFourComponent } from './pages/home-demo-four/home-demo-four.component';
import { HomeDemoNineComponent } from './pages/home-demo-nine/home-demo-nine.component';
import { HomeDemoOneComponent } from './pages/home-demo-one/home-demo-one.component';
import { HomeDemoSevenComponent } from './pages/home-demo-seven/home-demo-seven.component';
import { HomeDemoSixComponent } from './pages/home-demo-six/home-demo-six.component';
import { HomeDemoThreeComponent } from './pages/home-demo-three/home-demo-three.component';
import { HomeDemoTwoComponent } from './pages/home-demo-two/home-demo-two.component';
import { HowItWorksPageComponent } from './pages/how-it-works-page/how-it-works-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { ProductsDetailsPageComponent } from './pages/products-details-page/products-details-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ReviewsPageComponent } from './pages/reviews-page/reviews-page.component';
import { ScreenshotsPageComponent } from './pages/screenshots-page/screenshots-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { TeamOnePageComponent } from './pages/team-one-page/team-one-page.component';
import { TeamTwoPageComponent } from './pages/team-two-page/team-two-page.component';
import { TermsConditionsPageComponent } from './pages/terms-conditions-page/terms-conditions-page.component';

export const routes: Routes = [
    {
        path: ':lang', // <-- language prefix
        children: [
            { path: '', component: HomeDemoSevenComponent }, // default homepage
            // { path: 'index-2', component: HomeDemoTwoComponent },
            // { path: 'index-3', component: HomeDemoThreeComponent },
            // { path: 'index-4', component: HomeDemoFourComponent },
            // { path: 'index-5', component: HomeDemoFiveComponent },
            // { path: 'index-6', component: HomeDemoSixComponent },
            // { path: 'index-7', component: HomeDemoSevenComponent },
            // { path: 'index-8', component: HomeDemoEightComponent },
            // { path: 'index-9', component: HomeDemoNineComponent },

            { path: 'about-simple', component: AboutSimplePageComponent },
            { path: 'about-modern', component: AboutModernPageComponent },
            { path: 'features-1', component: FeaturesOnePageComponent },
            { path: 'features-2', component: FeaturesTwoPageComponent },
            { path: 'faq', component: FaqPageComponent },
            { path: 'sign-in', component: SignInPageComponent },
            { path: 'sign-up', component: SignUpPageComponent },
            { path: 'forgot-password', component: ForgetPasswordPageComponent },
            { path: 'how-it-works', component: HowItWorksPageComponent },
            { path: 'gallery', component: GalleryPageComponent },
            { path: 'coming-soon', component: ComingSoonPageComponent },
            { path: 'services', component: ServicesPageComponent },
            { path: 'pricing', component: PricingPageComponent },
            { path: 'feedback', component: ReviewsPageComponent },
            { path: 'app-download', component: AppDownloadPageComponent },
            { path: 'screenshots', component: ScreenshotsPageComponent },
            { path: 'team-1', component: TeamOnePageComponent },
            { path: 'team-2', component: TeamTwoPageComponent },
            { path: 'blog-grid', component: BlogGridPageComponent },
            { path: 'blog-right-sidebar', component: BlogRightSidebarPageComponent },
            { path: 'blog-left-sidebar', component: BlogLeftSidebarPageComponent },
            { path: 'blog-details/:slug', component: BlogDetailsPageComponent },
            { path: 'products', component: ProductsPageComponent },
            { path: 'cart', component: CartPageComponent },
            { path: 'checkout', component: CheckoutPageComponent },
            { path: 'product-details', component: ProductsDetailsPageComponent },
            { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
            { path: 'terms-conditions', component: TermsConditionsPageComponent },
            { path: 'contact', component: ContactPageComponent },

            { path: '**', component: NotFoundComponent }
        ]
    },

    // redirect base URL to English by default
    { path: '', redirectTo: '/en', pathMatch: 'full' },
    { path: '**', redirectTo: '/en' }
];
