import CoverImage1 from "@/public/images/cloth-image-1.jpg";
import CoverImage2 from "@/public/images/image92.png";
import CoverImage3 from "@/public/images/image98.png";
import Product1 from "@/public/images/image35.png";

const data = {
    brands: [
        { id: "651b9c8a1f4f1a9d12345678", name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { id: "651b9c8a1f4f1a9d22345678", name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { id: "651b9c8a1f4f1a9d32345678", name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { id: "651b9c8a1f4f1a9d42345678", name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { id: "651b9c8a1f4f1a9d52345678", name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
        { id: "651b9c8a1f4f1a9d62345678", name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Coca-Cola_logo.svg" },
        { id: "651b9c8a1f4f1a9d72345678", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
        { id: "651b9c8a1f4f1a9d82345678", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
        { id: "651b9c8a1f4f1a9d92345678", name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.svg" },
        { id: "651b9c8a1f4f1a9da2345678", name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
        { id: "651b9c8a1f4f1a9db2345678", name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" },
        { id: "651b9c8a1f4f1a9dc2345678", name: "Facebook (Meta)", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" },
        { id: "651b9c8a1f4f1a9dd2345678", name: "McDonald's", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/McDonald%27s_logo.svg" },
        { id: "651b9c8a1f4f1a9de2345678", name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
        { id: "651b9c8a1f4f1a9df2345678", name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Visa_Inc._logo.svg" },
        { id: "651b9c8a1f4f1a9d02345678", name: "Louis Vuitton", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Louis_Vuitton_logo_and_wordmark.svg" },
        { id: "651b9c8a1f4f1a9e02345678", name: "Huawei", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Huawei_standard_logo.svg" },
        { id: "651b9c8a1f4f1a9f02345678", name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pepsi_logo.svg" },
        { id: "651b9c8a1f4f1a9002345678", name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sony_logo.svg" },
        { id: "651b9c8a1f4f1a9112345678", name: "Disney", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Disney_wordmark.svg" },
        { id: "651b9c8a1f4f1a9222345678", name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
        { id: "651b9c8a1f4f1a9332345678", name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg" },
        { id: "651b9c8a1f4f1a9442345678", name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dell_logo_2016.svg" },
        { id: "651b9c8a1f4f1a9552345678", name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Oracle_logo.svg" },
        { id: "651b9c8a1f4f1a9662345678", name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { id: "651b9c8a1f4f1a9772345678", name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Cisco_logo_blue_2016.svg" },
        { id: "651b9c8a1f4f1a9882345678", name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/LG_logo_%282014%29.svg" },
        { id: "651b9c8a1f4f1a9992345678", name: "Panasonic", logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Panasonic_logo.svg" },
        { id: "651b9c8a1f4f1a9aa2345678", name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Ford_Motor_Company_Logo.svg" },
        { id: "651b9c8a1f4f1a9bb2345678", name: "Chevrolet", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Chevrolet_logo.svg" },
        { id: "651b9c8a1f4f1a9cc2345678", name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Hyundai_logo.svg" },
        { id: "651b9c8a1f4f1a9dd2345678", name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Kia_logo_2012.svg" },
        { id: "651b9c8a1f4f1a9ee2345678", name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Volkswagen_logo_2019.svg" },
        { id: "651b9c8a1f4f1a9ff2345678", name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_2016.svg" },
        { id: "651b9c8a1f4f1aa002345678", name: "Porsche", logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Porsche_Crest.svg" },
        { id: "651b9c8a1f4f1aa112345678", name: "Ferrari", logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Ferrari-Logo.svg" },
        { id: "651b9c8a1f4f1aa22345678", name: "Lamborghini", logo: "https://upload.wikimedia.org/wikipedia/en/2/23/Lamborghini_logo.svg" },
        { id: "651b9c8a1f4f1aa3345678", name: "Rolex", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Rolex_logo.svg" }],
    sourceCards: [
        {
            id: "Clothes-and-wear",
            title: "Clothes and wear",
            coverPhoto: CoverImage1
        },
        {
            id: "Home-and-outdoor",
            title: "Home and outdoor",
            coverPhoto: CoverImage2
        },
        {
            id: "Consumer-electronics-and-gadgets",
            title: "Consumer electronics and gadgets",
            coverPhoto: CoverImage3
        },
    ],
    products: [
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Clothes-and-wear",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Home-and-outdoor",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
        {
            source: "Consumer-electronics-and-gadgets",
            title: "Smart watches",
            discount: 50,
            image: Product1,
            price: 50
        },
    ]
}


export default data;