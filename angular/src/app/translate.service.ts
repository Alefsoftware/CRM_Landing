import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private lang: 'en' | 'ar' = 'en'; // default

    get currentLang() {
        return this.lang;
    }

    switchLang(lang: 'en' | 'ar') {
        this.lang = lang;
        // here you could also load translation files, set direction, etc.
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    t(key: string): string {
        // dummy translation logic (replace with real dictionary)
        const dict: any = {
            en: { hello: 'Hello', welcome: 'Welcome' },
            ar: {
                hello: 'مرحبا',
                welcome: 'أهلاً',
                'Home': "الرئيسية",
                "About Us": "من نحن",
                "About Souq Leader.”: "عن سوق ليدر.",
                "Pages": "الصفحات",
                "How It Works": "كيف يعمل",
                "Services": "خدمات",
                "Sign Up": "اشتراك",
                "Privacy Policy": "سياسة الخصوصية",
                "Terms & Conditions": " الشروط والأحكام",
                "Screenshots": " سكرين شوت",
                "App Download": "تحميل التطبيق",
                "Blog": "مدونة",
                "Contact Us": "اتصل بنا",
                "Get Started": " ابدأ الآن",
                "#Get YOUR 14 DAYS FREE TRIAL NOW": "احصل على تجربتك المجانية لمدة 14 يومًا الآن",
                "Completely New Features": "مميزات جديدة كلياً",
                "APP Seamless user experience": "كيف يبدو النظام",
                "APP Seamless user experienceUser-friendly and business-ready": "واجهة سلسة ومبسطة",
                "Request a demo": "اطلب عرض تجريبي",
                "Company Name": "اسم الشركة",
                "Contact Name": "اسم جهة الاتصال",
                "Email Address": "البريد الإلكتروني",
                "Phone Number": "رقم الهاتف",
                "App Screen": "شاشات التطبيق",
                "Download App": "تحميل التطبيق",
                "Available on the App Store": "متوفر على متجر التطبيقات",
                "Get it on Google Play": "متوفر على جوجل بلاي",
                "Subscribe to our newsletter": "اشترك في نشرتنا الإخبارية",
                "User-friendly and business-ready": "سهل الاستخدام وجاهز للأعمال",
                "Resources": "مصادر",
                "Services & Features": "الخدمات والمميزات",
                "How to Get Started": "كيف تبدأ",
                "Request a Demo": "اطلب عرض تجريبي",
                "Efficiency Drives Growth": "الكفاءة تدفع النمو",
                "App in Action": "الأداء"
            },
        };
        return dict[this.lang][key] || key;
    }
}
