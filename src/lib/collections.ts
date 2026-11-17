import { getAllRugs } from "@/lib/products";
import type { RugCategory, RugProduct, RugSubcategory } from "@/types/rug";

export interface CollectionFAQ {
  question: string;
  answer: string;
}

export interface CollectionItem {
  slug: string;
  name: string;
  type: "kategori" | "altKategori";
  targetName: RugCategory | RugSubcategory;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge: string;
  shortDesc: string;
  longIntro: string;
  image: string;
  idealSizes: string[];
  features: string[];
  careTips: string[];
  faqs: CollectionFAQ[];
  relatedSlugs: string[];
}

export const COLLECTIONS_DATA: CollectionItem[] = [
  // --- 8 ANA KATEGORİ ---
  {
    slug: "mutfak-halisi",
    name: "Mutfak Halısı",
    type: "kategori",
    targetName: "Mutfak halısı",
    metaTitle: "Mutfak Halısı Modelleri, Yıkanabilir & Kaymaz Taban | Seç Halı",
    metaDescription:
      "Leke tutmayan, silinebilir, kaymaz tabanlı ve makinede yıkanabilir mutfak halısı modelleri Seç Halı'da. Mutfak tezgah ve masa önü ölçüleriyle hemen keşfedin.",
    h1: "Mutfak Halısı Modelleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Leke tutmaz, silinebilir ve pratik mutfak çözümleri",
    longIntro:
      "Mutfaklar evin en hareketli ve kaza riski en yüksek alanlarıdır. Seç Halı mutfak koleksiyonu; leke tutmayan apreli dokuları, sıvı itici özellikleri, çamaşır makinesinde yıkanabilen pratikliği ve fayans üzerinde kaymayan özel taban teknolojisiyle mutfağınıza hem hijyen hem de estetik katar.",
    image: "/rugs/rug-04.jpg",
    idealSizes: ["80x150 cm", "80x300 cm", "100x200 cm", "120x180 cm"],
    features: [
      "Leke tutmaz apreli koruyucu yüzey",
      "Fayans ve seramikte kaymayan jel/lateks taban",
      "30 derecede makinede yıkanabilir pratik temizlik",
      "Aşınmaya dayanıklı sıkı dokuma yapısı",
    ],
    careTips: [
      "Sıvı döküldüğünde hemen kağıt havluyla tampon yaparak temizleyiniz.",
      "30°C'de narin programda, sıkma yapmadan yıkanabilir.",
      "Ağartıcı ve klorlu çamaşır suyu kullanılmamalıdır.",
    ],
    faqs: [
      {
        question: "Mutfak halısı makinede yıkanabilir mi?",
        answer:
          "Evet, Seç Halı mutfak koleksiyonundaki modeller 30 derecede çamaşır makinesinde yıkanabilir ve formunu kaybetmez.",
      },
      {
        question: "Mutfak için en çok tercih edilen halı ölçüsü hangisidir?",
        answer:
          "Tezgah önü ve dar mutfaklar için 80x150 cm ve 80x300 cm yolluklar; yemek masası bulunan geniş mutfaklar için 100x200 cm veya 120x180 cm idealdir.",
      },
      {
        question: "Fayans ve seramik üzerinde kayma yapar mı?",
        answer:
          "Tüm mutfak serilerimiz zemin sabitleyici kaymaz taban teknolojisiyle üretilmekte olup fayans ve seramikte kayma yapmaz.",
      },
    ],
    relatedSlugs: ["kaymaz-taban", "makinede-yikanabilir", "kesme-hali", "yolluk"],
  },
  {
    slug: "banyo-paspasi",
    name: "Banyo Paspası",
    type: "kategori",
    targetName: "Banyo paspası",
    metaTitle: "Banyo Paspası Modelleri, Hızlı Kuruyan & Kaymaz | Seç Halı",
    metaDescription:
      "Yüksek su emici, hızlı kuruyan ve kaymaz tabanlı lüks banyo paspası modelleri. Banyonuza sıcaklık katan yumuşak dokular Seç Halı'da.",
    h1: "Banyo Paspası Modelleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Hızlı kuruyan, yumuşak doku ve kaymaz güvenlik",
    longIntro:
      "Islak zeminlerde güvenlik, maksimum emicilik ve yumuşaklık banyo paspaslarının vazgeçilmezidir. Doğal pamuk ve nefes alan mikrofiber liflerle dokunan Seç Halı banyo paspasları, banyo sonrası adımlarınızı sıcacık tutarken hızlı kuruyan yapısıyla koku ve nem oluşumunu engeller.",
    image: "/rugs/rug-06.jpg",
    idealSizes: ["60x100 cm", "80x150 cm", "Banyo Seti (2'li / 3'lü)"],
    features: [
      "Ultra yüksek su emicilik ve hızlı kuruma",
      "Islak fayansa güçlü tutunan kaymaz taban",
      "Antibakteriyel ve kokusuz hav yapısı",
      "Ayak altını saran pamuksu yumuşaklık",
    ],
    careTips: [
      "Haftalık olarak 30 derecede narin yıkama önerilir.",
      "Kurutma makinesinde düşük ısıda veya sererek kurutunuz.",
      "Yumuşatıcı kullanımı emiciliği azaltabileceğinden az miktarda kullanılmalıdır.",
    ],
    faqs: [
      {
        question: "Banyo paspasının tabanı zamanla dökülme yapar mı?",
        answer:
          "Seç Halı banyo paspasları yüksek kaliteli termo/lateks tabana sahip olup yıkamalarda ufalanma veya dökülme yapmaz.",
      },
      {
        question: "Banyo paspası küflenme ve koku yapar mı?",
        answer:
          "Hızlı kuruma sağlayan nefes alan hava kanallı dokuma sayesinde nem birikmesini ve koku oluşumunu önler.",
      },
    ],
    relatedSlugs: ["banyo-takimi", "kaymaz-taban", "makinede-yikanabilir", "mutfak-halisi"],
  },
  {
    slug: "salon-halisi",
    name: "Salon Halısı",
    type: "kategori",
    targetName: "Salon halısı",
    metaTitle: "Salon Halısı Modelleri ve Fiyatları | Seç Halı",
    metaDescription:
      "Modern, minimalist ve eskitme salon halısı modelleri Seç Halı'da. 160x230 ve 200x290 cm geniş salon ölçüleri, peşin fiyatına taksit ve ücretsiz kargo fırsatıyla.",
    h1: "Salon Halısı Modelleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Geniş alanlar için zengin dokular ve mimari zarafet",
    longIntro:
      "Salon, evin kimliğini ve estetik duruşunu yansıtan en önemli yaşam alanıdır. Seç Halı salon koleksiyonu; mimari kabartmalı modern desenlerden geleneksel Türk madalyonlarına kadar uzanan zengin dokuma portföyüyle koltuklarınıza, parkenize ve gün ışığına kusursuz bir zemin armonisi sağlar.",
    image: "/rugs/rug-01.jpg",
    idealSizes: ["160x230 cm", "200x290 cm", "120x180 cm"],
    features: [
      "Göz alıcı yüksek-alçak rölyef doku",
      "Toz tutmayan ve tüy dökmeyen kaliteli iplik",
      "Mobilya ayaklarına dayanıklı ezilmez hav",
      "Doğal ışıkta parlamayan mat ve asil görünüm",
    ],
    careTips: [
      "Haftada 1-2 kez fırçasız başlıkla süpürünüz.",
      "Lekelere anında beyaz nemli bezle müdahale ediniz.",
      "Ağır mobilya ayakları altına koruyucu keçe koyulması önerilir.",
    ],
    faqs: [
      {
        question: "Salon için 160x230 cm mi yoksa 200x290 cm mi seçmeliyim?",
        answer:
          "Standart 3'lü koltuk önleri için 160x230 cm en popüler ölçüdür; L köşe koltuklar veya geniş salonlarda koltukların ön ayaklarını halıya bastırmak için 200x290 cm tercih edilmelidir.",
      },
      {
        question: "Robot süpürgeye uygun mu?",
        answer:
          "Evet, 9-11 mm optimize edilmiş hav yüksekliği ve saçaksız/düz overloklu kenar yapısı sayesinde robot süpürgeler rahatça tırmanır ve temizler.",
      },
    ],
    relatedSlugs: ["vintage-hali", "dekoratif-hali", "sisal-hali", "kesme-hali"],
  },
  {
    slug: "cocuk-halisi",
    name: "Çocuk Halısı",
    type: "kategori",
    targetName: "Çocuk halısı",
    metaTitle: "Çocuk Odası Halısı Modelleri, Antialerjik & Güvenli | Seç Halı",
    metaDescription:
      "OEKO-TEX sertifikalı, tüy dökmeyen, antialerjik ve kaymaz tabanlı çocuk odası halıları. Bebeğinizin ve çocuğunuzun sağlığına uygun Seç Halı modelleri.",
    h1: "Çocuk Odası Halısı Modelleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Antialerjik, organik dokulu ve güvenli modeller",
    longIntro:
      "Çocuklarımızın ilk adımlarını attığı, saatlerce oyun oynadığı zeminlerin sağlıklı ve güvenli olması her şeyden önemlidir. Seç Halı çocuk koleksiyonu; OEKO-TEX Standard 100 sertifikalı organik boyalarla üretilen, hav dökmeyen antialerjik lifleri ve düşmelere karşı yumuşak darbe emici yapısıyla ebeveynlere tam güven verir.",
    image: "/rugs/rug-07.jpg",
    idealSizes: ["100x200 cm", "120x180 cm", "160x230 cm"],
    features: [
      "OEKO-TEX sertifikalı antialerjik yüzey",
      "Asla hav ve tüy dökmeyen iplik yapısı",
      "Kaymaz tabanlı çocuk oyun güvenliği",
      "Leke tutmaz ve yıkanabilir",
    ],
    careTips: [
      "Sık süpürülerek toz birikmesi önlenmelidir.",
      "30 derecede narin yıkama yapılabilir.",
      "Doğal sabun bazlı temizleyiciler kullanılması tavsiye edilir.",
    ],
    faqs: [
      {
        question: "Astımlı veya alerjik çocuklar için uygun mu?",
        answer:
          "Evet, halılarımız hav dökmeyen ve toz akarı (mite) barındırmayan antialerjik polipropilen/pamuk liflerinden üretilmiştir.",
      },
      {
        question: "Yıkandığında desen ve renkler solar mı?",
        answer:
          "Doğal ve solmaya dayanıklı iplik boyama teknolojisi sayesinde renk canlılığı onlarca yıkamada korunur.",
      },
    ],
    relatedSlugs: ["makinede-yikanabilir", "kaymaz-taban", "yatak-odasi-halisi", "dekoratif-hali"],
  },
  {
    slug: "yatak-odasi-halisi",
    name: "Yatak Odası Halısı",
    type: "kategori",
    targetName: "Yatak odası halısı",
    metaTitle: "Yatak Odası Halısı Modelleri, Yumuşak & Sıcak | Seç Halı",
    metaDescription:
      "Sabahları yumuşacık adımlarla uyanmanızı sağlayan yatak odası halısı ve yatak yanı yolluk modelleri. Konforlu dokular Seç Halı'da.",
    h1: "Yatak Odası Halısı Modelleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Güne konforla başlamanızı sağlayan yumuşaklık",
    longIntro:
      "Yatak odası günün yorgunluğunu geride bıraktığınız en sakin sığınağınızdır. Seç Halı yatak odası halıları; ayak ucuna yerleştirilen geniş ebatlardan yatak yanları için ikili yolluk konseptine kadar yumuşak havı, pastel renkleri ve huzur veren yalın çizgileriyle dinlendirici bir atmosfer sunar.",
    image: "/rugs/rug-03.jpg",
    idealSizes: ["80x150 cm (Yatak yanı)", "120x180 cm", "160x230 cm (Ayak ucu)"],
    features: [
      "Ekstra yumuşak adım konforu",
      "Akustik ses ve yankı yalıtımı",
      "Toz tutmayan antistatik yüzey",
      "Pastel ve dingin renk paletleri",
    ],
    careTips: [
      "Haftalık düzenli süpürme yeterlidir.",
      "Doğrudan yoğun güneş ışığından koruyunuz.",
      "Mevsim geçişlerinde havalandırılması tavsiye edilir.",
    ],
    faqs: [
      {
        question: "Yatak odasına nasıl bir halı yerleşimi yapılmalı?",
        answer:
          "En yaygın yöntem yatağın iki yanına 80x150 cm iki parça sermek veya yatağın altından ayak ucuna doğru 160x230 cm tek parça uzatmaktır.",
      },
      {
        question: "Statik elektriklenme yapar mı?",
        answer:
          "Pamuk ve bambu ipeği karışımlı liflerimiz antistatik apreye sahip olduğundan elektriklenme yapmaz.",
      },
    ],
    relatedSlugs: ["salon-halisi", "yolluk", "cocuk-halisi", "vintage-hali"],
  },
  {
    slug: "yolluk",
    name: "Yolluk",
    type: "kategori",
    targetName: "Yolluk",
    metaTitle: "Yolluk Modelleri, Koridor & Antre Yollukları | Seç Halı",
    metaDescription:
      "80x150, 80x300, 100x300 standart ölçülerde ve özel kesme rulo yolluk modelleri. Kaymaz tabanlı, yıkanabilir şık koridor yollukları Seç Halı'da.",
    h1: "Koridor ve Antre Yolluk Modelleri",
    badge: "Ana Kategori",
    shortDesc: "Antre ve koridorlar için boydan boya zarafet",
    longIntro:
      "Evin giriş kapısından odalara uzanan antre ve koridorlar, mekanın ilk izlenimini oluşturur. Yoğun ayak trafiğine maruz kalan bu alanlar için geliştirilen Seç Halı yolluk serisi; aşınmaya dayanıklı dokuması, kapı altlarına takılmayan ince ve zarif profili, zemin sabitleyici tabanıyla koridorlarınıza şıklık katar.",
    image: "/rugs/rug-12.jpg",
    idealSizes: ["80x150 cm", "80x300 cm", "100x200 cm", "100x300 cm", "Özel Kesme Rulo"],
    features: [
      "Yoğun ayak trafiğine dayanıklı sık dokuma",
      "Kapı açılıp kapanmasını engellemeyen hav kalınlığı",
      "Zemin kaymasını önleyen güvenli taban",
      "Özel boy kesim imkanı",
    ],
    careTips: [
      "Giriş alanlarında haftada 2 kez süpürülmelidir.",
      "Halı üzerinde ayakkabıyla yürünmemesi ömrünü uzatır.",
      "Yıkanabilir seriler 30°C'de yıkanabilir.",
    ],
    faqs: [
      {
        question: "Koridorum standart dışı uzunlukta, özel ölçü kesim yapıyor musunuz?",
        answer:
          "Evet, Kesme Halı serimizde koridorunuzun tam boyuna göre santimi santimine kesilip kenarları overloklanarak hazırlanır.",
      },
      {
        question: "Yolluklar kapı altlarına sürter mi?",
        answer:
          "Yolluk hav yüksekliklerimiz 7-9 mm optimize edilmiş olup standart oda kapılarının altına sürtünmeden rahatça açılmasını sağlar.",
      },
    ],
    relatedSlugs: ["koridor-halisi", "kesme-hali", "kaymaz-taban", "mutfak-halisi"],
  },
  {
    slug: "kilim",
    name: "Kilim",
    type: "kategori",
    targetName: "Kilim",
    metaTitle: "Kilim Modelleri, Anadolu Dokuma & Çift Taraflı | Seç Halı",
    metaDescription:
      "Doğal pamuk ve yün iplikli, çift taraflı kullanılabilen otantik ve modern kilim modelleri. Anadolu motifleri ve çağdaş çizgiler Seç Halı'da.",
    h1: "Anadolu & Modern Kilim Modelleri",
    badge: "Ana Kategori",
    shortDesc: "Geleneksel motifler ve çift taraflı doğal dokuma",
    longIntro:
      "Yüzyılların dokuma geleneğini modern yaşam alanlarına taşıyan kilimler, havsız düz dokusu ve hafifliğiyle dört mevsim ferah bir kullanım sunar. Seç Halı kilim koleksiyonu; çift taraflı kullanılabilen dayanıklı yapısı, doğal pamuk ve yün lifleri, etnik ve geometrik desenleriyle evinize zamansız bir sıcaklık kazandırır.",
    image: "/rugs/rug-05.jpg",
    idealSizes: ["80x150 cm", "120x180 cm", "160x230 cm"],
    features: [
      "Çift taraflı (ters-düz) kullanım avantajı",
      "Hafif ve havsız düz dokuma",
      "Doğal pamuk ve yün iplik",
      "Yaz ve kış 4 mevsim ferah kullanım",
    ],
    careTips: [
      "Çırpma yapmadan süpürünüz.",
      "Çift taraflı kullanarak aşınmayı homojen dağıtabilirsiniz.",
      "Soğuk suda elde veya kuru temizleme tavsiye edilir.",
    ],
    faqs: [
      {
        question: "Kilimler çift taraflı kullanılabilir mi?",
        answer:
          "Evet, dokuma tekniği sayesinde desenler her iki yüzde de aynı netlikte belirir ve her iki tarafı da kullanılabilir.",
      },
      {
        question: "Kilim altına kaydırmaz gerekir mi?",
        answer:
          "Hafif ve düz dokuma olduğu için parke zeminlerde Seç Halı kaydırmaz tabanlık ile kullanılması konforu artırır.",
      },
    ],
    relatedSlugs: ["vintage-hali", "sisal-hali", "salon-halisi", "yolluk"],
  },
  {
    slug: "banyo-takimi",
    name: "Banyo Takımı",
    type: "kategori",
    targetName: "Banyo takımı",
    metaTitle: "Banyo Takımı Modelleri, 2'li ve 3'lü Paspas Setleri | Seç Halı",
    metaDescription:
      "Klozet önü ve lavabo paspasından oluşan lüks, kaymaz tabanlı ve yıkanabilir banyo takımı setleri. Banyo dekorasyonunuzu tamamlayan Seç Halı serileri.",
    h1: "Lüks Banyo Takımı Setleri ve Fiyatları",
    badge: "Ana Kategori",
    shortDesc: "Takım uyumu ve kaymaz tabanlı set konsepti",
    longIntro:
      "Banyonuzda kusursuz bir renk ve doku uyumu yakalamak için tasarlanan 2'li ve 3'lü banyo takımları; lavabo önü, duşakabin çıkışı ve klozet önünü tek bir konseptte birleştirir. Su damlacıklarını saniyeler içinde hapseden pamuksu hav yapısı ve yıkanabilir kaymaz tabanıyla banyonuza otel konforunu getirir.",
    image: "/rugs/rug-02.jpg",
    idealSizes: ["2'li Set (60x100 + 50x60 cm)", "3'lü Set (60x100 + 50x60 + Klozet Kapağı)"],
    features: [
      "Bütünsel banyo set konsepti",
      "Ultra yumuşak pamuksu hav dokusu",
      "Makinede yıkanabilir pratik bakım",
      "Kaymaz güvenli lateks taban",
    ],
    careTips: [
      "30 derecede benzer renklerle yıkayınız.",
      "Güneş altında tersinden kurutulması önerilir.",
      "Sıkma devrini düşük tutunuz.",
    ],
    faqs: [
      {
        question: "Banyo takımı setinde hangi parçalar bulunur?",
        answer:
          "Standart setlerimiz büyük lavabo/duş paspası (60x100 cm) ve klozet önü paspasından (50x60 cm) oluşmaktadır.",
      },
      {
        question: "Banyodaki nem ve rutubete dayanıklı mı?",
        answer:
          "Hava sirkülasyonu sağlayan dokuma yapısı sayesinde nemi hızla buharlaştırır ve küf oluşumunu engeller.",
      },
    ],
    relatedSlugs: ["banyo-paspasi", "kaymaz-taban", "makinede-yikanabilir", "mutfak-halisi"],
  },

  // --- 8 ALT KATEGORİ ---
  {
    slug: "outlet-urunler",
    name: "Outlet Ürünler",
    type: "altKategori",
    targetName: "Outlet ürünler",
    metaTitle: "Outlet Halı Modelleri, İndirimli ve Fırsat Serileri | Seç Halı",
    metaDescription:
      "Sezon sonu, seri sonu ve stok fazlası birinci sınıf halı modelleri Seç Halı Outlet'te büyük indirimlerle. Hemen tükenmeden yakalayın.",
    h1: "Outlet Halı Modelleri ve Fırsat Ürünleri",
    badge: "Özel Alt Kategori",
    shortDesc: "Stok sonu ve sezon fırsatlarıyla birinci sınıf indirimli seriler",
    longIntro:
      "Birinci sınıf yerli dokuma kalitesini bütçe dostu avantajlı fiyatlarla buluşturan Seç Halı Outlet reyonu; sezon yenilemeleri, stok sonu seriler ve ihracat fazlası sınırlı adetli modellerden oluşur. Kusursuz fabrika kalitesine sahip bu halılar stoklarla sınırlıdır.",
    image: "/rugs/rug-08.jpg",
    idealSizes: ["80x150 cm", "120x180 cm", "160x230 cm", "200x290 cm"],
    features: [
      "%30-%50'ye varan sezon sonu indirimleri",
      "Kusursuz orijinal birinci sınıf üretim",
      "Sınırlı stok ve anında kargo",
      "14 gün iade güvencesi",
    ],
    careTips: [
      "Diğer koleksiyonlarımızla aynı üstün bakım kalitesine sahiptir.",
      "Detaylı temizlik talimatları ürün etiketinde yer alır.",
    ],
    faqs: [
      {
        question: "Outlet ürünler defolu veya ikinci kalite midir?",
        answer:
          "Hayır, Seç Halı outlet kategorisindeki tüm halılar tamamen hatasız, orijinal ambalajında birinci sınıf üretim ürünlerdir.",
      },
      {
        question: "Outlet halılarda iade hakkım var mı?",
        answer:
          "Evet, tüm ürünlerimizde olduğu gibi 14 gün koşulsuz kolay iade ve değişim hakkınız geçerlidir.",
      },
    ],
    relatedSlugs: ["vintage-hali", "salon-halisi", "kesme-hali", "makinede-yikanabilir"],
  },
  {
    slug: "vintage-hali",
    name: "Vintage Halı",
    type: "altKategori",
    targetName: "Vintage halı",
    metaTitle: "Vintage Halı Modelleri, Eskitme & Madalyon Desenler | Seç Halı",
    metaDescription:
      "Geleneksel Türk motiflerinin modern eskitme dokularla buluştuğu vintage halı koleksiyonu. Yaşam alanınıza nostaljik ve asil bir hava katın.",
    h1: "Vintage & Eskitme Halı Modelleri",
    badge: "Özel Alt Kategori",
    shortDesc: "Anadolu madalyon mirasından ilham alan eskitme dokular",
    longIntro:
      "Tarihin dokuma mirasını modern iç mimariyle buluşturan Vintage koleksiyonumuz; Anadolu madalyonları, Uşak ve Hereke esintili desenlerin özel eskitme teknikleriyle yeniden üretilmesidir. Soluk pastel tonları ve hafif yıpratılmış asil dokusuyla hem klasik hem de endüstriyel modern mobilyalarla kusursuz uyum sağlar.",
    image: "/rugs/rug-02.jpg",
    idealSizes: ["120x180 cm", "160x230 cm", "200x290 cm"],
    features: [
      "Özel eskitme ve patine dokuma tekniği",
      "Geleneksel Anadolu ve şark madalyon desenleri",
      "Parlamayan doğal bambu ipeği ve pamuk karışımı",
      "Zamansız rustik ve bohem estetik",
    ],
    careTips: [
      "Hassas fırçasız başlıkla süpürünüz.",
      "Ağartıcı içermeyen doğal halı şampuanı kullanınız.",
    ],
    faqs: [
      {
        question: "Vintage halı eskitme deseni zamanla silinir mi?",
        answer:
          "Hayır, desenler sonradan boyama değil iplik dokuma esnasında renk geçişleriyle oluşturulduğundan asla silinmez.",
      },
      {
        question: "Modern salonlarda vintage halı nasıl görünür?",
        answer:
          "Düz renk minimalist koltuklar ve meşe/ceviz ahşap mobilyalarla muhteşem bir kontrast ve sıcaklık yaratır.",
      },
    ],
    relatedSlugs: ["salon-halisi", "kilim", "dekoratif-hali", "outlet-urunler"],
  },
  {
    slug: "koridor-halisi",
    name: "Koridor Halısı",
    type: "altKategori",
    targetName: "Koridor halısı",
    metaTitle: "Koridor Halısı Modelleri, Dar & Uzun Geçiş Halıları | Seç Halı",
    metaDescription:
      "Uzun koridorlar ve antreler için özel dokunmuş, kaymaz tabanlı koridor halısı modelleri. 80 cm ve 100 cm genişlik seçenekleriyle Seç Halı'da.",
    h1: "Koridor Halısı Modelleri ve Fiyatları",
    badge: "Özel Alt Kategori",
    shortDesc: "Geçiş alanları ve antreler için dayanıklı ve şık koridor yollukları",
    longIntro:
      "Koridorlar odalar arasındaki bağlantıyı kuran, gün boyu en çok adımlanan geçiş yollarıdır. Seç Halı koridor halıları; aşınmaya karşı yüksek dayanımlı dokusu, tabanındaki kaymaz yapısı ve koridorun akustiğini iyileştirip adım seslerini emen yapısıyla evinizin atmosferini dönüştürür.",
    image: "/rugs/rug-12.jpg",
    idealSizes: ["80x150 cm", "80x300 cm", "100x300 cm", "Özel Rulo Kesim"],
    features: [
      "Adım ve ayak sesini emen akustik doku",
      "Geçiş yoğunluğuna dirençli sıkı ilmek yapısı",
      "Kapı eşiklerine takılmayan ince kenarlar",
      "Zemine yapışan güvenli kaymaz taban",
    ],
    careTips: [
      "Haftada iki kez süpürülmelidir.",
      "Geçiş yönünü değiştirerek aşınmayı dengeleyebilirsiniz.",
    ],
    faqs: [
      {
        question: "Koridor halısı koridoru dar gösterir mi?",
        answer:
          "Açık krem, vizon ve ince çizgili modeller dar koridorları görsel olarak çok daha geniş ve ferah gösterir.",
      },
      {
        question: "Robot süpürge koridor halısına takılır mı?",
        answer:
          "Özel ince kenar overlokları sayesinde robot süpürgeler takılmadan ve halıyı toplamadan rahatça temizler.",
      },
    ],
    relatedSlugs: ["yolluk", "kesme-hali", "kaymaz-taban", "mutfak-halisi"],
  },
  {
    slug: "kaymaz-taban",
    name: "Kaymaz Taban Halılar",
    type: "altKategori",
    targetName: "Kaymaz taban",
    metaTitle: "Kaymaz Taban Halı Modelleri, Jel & Lateks Taban | Seç Halı",
    metaDescription:
      "Laminat, parke ve fayansta asla kaymayan güvenli kaymaz taban halı modelleri. Çocuklu ve evcil hayvanlı aileler için ideal Seç Halı serileri.",
    h1: "Kaymaz Taban Halı Modelleri ve Fiyatları",
    badge: "Özel Alt Kategori",
    shortDesc: "Fayans ve parkede kayma yapmayan güvenli zemin sabitleyici taban",
    longIntro:
      "Evinizde güvenli adımlar atmak için zemin tutuculuğu en kritik kriterdir. Kaymaz tabanlı halılarımız; laminat, mermer, granit ve cilalı parke zeminlere güçlü şekilde tutunarak halının kaymasını, toplanmasını ve kırışmasını tamamen önler. Yaşlılar, çocuklar ve evcil hayvanlar için güvenli zemin konforu sağlar.",
    image: "/rugs/rug-04.jpg",
    idealSizes: ["80x150 cm", "80x300 cm", "100x200 cm", "120x180 cm", "160x230 cm"],
    features: [
      "Zemine tam tutunan termo/lateks kaymaz taban",
      "Zemine yapışmaz ve parkede iz bırakmaz",
      "Yıkanabilir ve silinebilir pratik yapı",
      "Toplanma ve potluk yapmayan form",
    ],
    careTips: [
      "Kaymaz tabanın özelliğini kaybetmemesi için yüksek ısıda ütülenmemelidir.",
      "30°C'de makinede yıkanabilir.",
    ],
    faqs: [
      {
        question: "Kaymaz taban parkede leke veya yapışkanlık bırakır mı?",
        answer:
          "Hayır, taban malzememiz kimyasal yapışkan içermeyen doğal kavrayıcı termo latekstir; parkeye asla zarar vermez ve iz bırakmaz.",
      },
      {
        question: "Yıkandıkça kaymazlığı gider mi?",
        answer:
          "Kaliteli vulkanize taban yapısı sayesinde onlarca yıkamadan sonra bile kaymazlık performansını korur.",
      },
    ],
    relatedSlugs: ["makinede-yikanabilir", "mutfak-halisi", "yolluk", "cocuk-halisi"],
  },
  {
    slug: "kesme-hali",
    name: "Kesme Halı",
    type: "altKategori",
    targetName: "Kesme halı",
    metaTitle: "Kesme Halı & Rulo Yolluk, Özel Ölçü Kesim | Seç Halı",
    metaDescription:
      "Evinizin koridor ve odasına özel santimi santimine kesilen kesme halı ve rulo yolluk modelleri. Ücretsiz overloklu Seç Halı modelleri.",
    h1: "Özel Ölçü Kesme Halı ve Rulo Modelleri",
    badge: "Özel Alt Kategori",
    shortDesc: "Mekanınızın tam ölçüsüne göre özel kesilip overloklanan rulo halılar",
    longIntro:
      "Her evin koridoru, balkonu veya mutfağı standart ebatlara sığmayabilir. Seç Halı Kesme Halı hizmetiyle 80 cm, 100 cm ve 120 cm rulo enlerinden istediğiniz uzunlukta kesim yapılır. Kesilen kenarlar birinci sınıf sıkı overlok dikişiyle kapatılarak sökülme yapmayan kusursuz bir halıya dönüştürülür.",
    image: "/rugs/rug-11.jpg",
    idealSizes: ["80 cm Eninde İstenen Boy", "100 cm Eninde İstenen Boy", "120 cm Eninde İstenen Boy"],
    features: [
      "Santimi santimine mekana özel boy kesimi",
      "Kenarları ücretsiz sıkı overlok dikişli",
      "İster düz ister desenli zengin rulo seçenekleri",
      "Hızlı hazırlık ve ertesi gün kargo",
    ],
    careTips: [
      "Overlok dikişlerinin zarar görmemesi için çırparak silkelemeyiniz.",
      "Normal süpürme ve silme yöntemleriyle temizleyiniz.",
    ],
    faqs: [
      {
        question: "Kesme halı siparişi nasıl verilir?",
        answer:
          "Rulo enini seçtikten sonra koridorunuzun net uzunluğunu belirterek siparişinizi verebilirsiniz; kenarları overloklu olarak gönderilir.",
      },
      {
        question: "Kesilen kenarlarda sökülme veya atma olur mu?",
        answer:
          "Hayır, yüksek devirli endüstriyel makinelerde çift sıra overlok çekildiği için kenarlar uzun yıllar sağlam kalır.",
      },
    ],
    relatedSlugs: ["koridor-halisi", "yolluk", "kaymaz-taban", "mutfak-halisi"],
  },
  {
    slug: "makinede-yikanabilir",
    name: "Makinede Yıkanabilir Halılar",
    type: "altKategori",
    targetName: "Makinede yıkanabilir",
    metaTitle: "Makinede Yıkanabilir Halı Modelleri, İnce & Pratik | Seç Halı",
    metaDescription:
      "30 derecede çamaşır makinesinde yıkanabilen, leke tutmayan ve hafif yıkanabilir halı modelleri. Kolay temizlik sağlayan Seç Halı modelleri.",
    h1: "Makinede Yıkanabilir Halı Modelleri ve Fiyatları",
    badge: "Özel Alt Kategori",
    shortDesc: "30 derecede kolayca yıkanabilen, leke tutmayan pratik aile serileri",
    longIntro:
      "Yoğun günlük tempoda halı yıkama servislerini beklemek tarihe karıştı. Makinede yıkanabilir halı koleksiyonumuz; hafif gövde yapısı, esnek dokusu ve solmaya karşı dirençli iplikleriyle ev tipi çamaşır makinelerinde 30 derecede rahatlıkla yıkanır, hızla kurur ve her yıkamada ilk günkü tazeliğini korur.",
    image: "/rugs/rug-09.jpg",
    idealSizes: ["80x150 cm", "100x200 cm", "120x180 cm", "160x230 cm"],
    features: [
      "Ev çamaşır makinesine kolayca sığan hafif yapı",
      "30 derecede yıkanabilir leke tutmaz apre",
      "Hızlı kuruma ve kırışmayan doku",
      "Antibakteriyel ve hijyenik yaşam",
    ],
    careTips: [
      "30°C narin yıkama programını tercih ediniz.",
      "Ağartıcı veya yumuşatıcı kullanmayınız.",
      "Gölgede sererek kurutulması renk ömrünü uzatır.",
    ],
    faqs: [
      {
        question: "160x230 cm yıkanabilir halı çamaşır makinesine sığar mı?",
        answer:
          "7-8 kg ve üzeri standart ev tipi çamaşır makinelerine hafif katlanabilir yapısı sayesinde rahatlıkla sığmaktadır.",
      },
      {
        question: "Yıkandıktan sonra çekme veya büzülme yapar mı?",
        answer:
          "Önceden termofikse edilmiş kumaş yapısı sayesinde 30 derece yıkamalarda çekme veya ebat kaybı yaşanmaz.",
      },
    ],
    relatedSlugs: ["kaymaz-taban", "mutfak-halisi", "cocuk-halisi", "banyo-paspasi"],
  },
  {
    slug: "sisal-hali",
    name: "Sisal Halı",
    type: "altKategori",
    targetName: "Sisal halı",
    metaTitle: "Sisal & Jüt Halı Modelleri, Doğal Bitkisel Lifler | Seç Halı",
    metaDescription:
      "Katkısız doğal bitki lifleri, sisal ve jüt dokuma halı modelleri. Bohem, hasır ve İskandinav zemin dekorasyonu için Seç Halı serileri.",
    h1: "Doğal Sisal ve Jüt Halı Modelleri",
    badge: "Özel Alt Kategori",
    shortDesc: "Katkısız bitki lifleri ve doğal jütten dokunan nefes alan organik yüzey",
    longIntro:
      "Doğanın yalınlığını ve sıcaklığını zeminlerinize taşıyan Sisal ve Jüt koleksiyonumuz; katkısız bitkisel liflerin rustik örgü teknikleriyle işlenmesiyle hayat bulur. Tozu içine hapsetmeyen düz yapısı, statik elektrik üretmeyen organik dokusu ve hasır görünümüyle özellikle bohem ve modern mekanların en gözde parçasıdır.",
    image: "/rugs/rug-08.jpg",
    idealSizes: ["80x150 cm", "120x180 cm", "160x230 cm", "200x290 cm"],
    features: [
      "%100 doğal bitkisel lifler ve jüt dokuma",
      "Statik elektriklenme yapmayan organik yapı",
      "Tozu ve tüyleri içine çekmeyen düz örgü",
      "Bohem, hasır ve İskandinav stil uyumu",
    ],
    careTips: [
      "Kuru fırça veya vakumlu süpürgeyle temizleyiniz.",
      "Aşırı ıslak bırakılmamalı, nemli bezle silinmelidir.",
      "Doğal lif yapısı gereği hafif organik koku zamanla kaybolur.",
    ],
    faqs: [
      {
        question: "Sisal halı sert midir, ayak yakar mı?",
        answer:
          "Modern yumuşatılmış jüt ve pamuk lifi karışımlarıyla üretildiği için sertlik hissi minimumdur; çıplak ayakla konforla yürünebilir.",
      },
      {
        question: "Sisal halı temizliği nasıl yapılır?",
        answer:
          "Düz örgülü yapısı sayesinde kırıntı ve tozlar yüzeyde kalır; hafif nemli bezle silinerek veya süpürülerek saniyeler içinde temizlenir.",
      },
    ],
    relatedSlugs: ["kilim", "salon-halisi", "dekoratif-hali", "vintage-hali"],
  },
  {
    slug: "dekoratif-hali",
    name: "Dekoratif Halı",
    type: "altKategori",
    targetName: "Dekoratif halı",
    metaTitle: "Dekoratif Halı Modelleri, Modern Mimari Desenler | Seç Halı",
    metaDescription:
      "Evinizin odak noktasını oluşturan sanatsal, geometrik ve modern dekoratif halı modelleri. Trend renkler ve lüks dokular Seç Halı'da.",
    h1: "Modern Dekoratif Halı Modelleri ve Fiyatları",
    badge: "Özel Alt Kategori",
    shortDesc: "Modern mimari desenlerle yaşam alanınızın odak noktasını oluşturan modeller",
    longIntro:
      "Bir oda yalnızca mobilyalardan ibaret değildir; zemindeki doğru doku tüm mekana sanatsal bir derinlik kazandırır. Seç Halı Dekoratif koleksiyonu; çağdaş mimari desenler, soyut geometrik formlar ve ışığa göre değişen ton geçişleriyle yaşam alanınızın en iddialı odak noktasını meydana getirir.",
    image: "/rugs/rug-10.jpg",
    idealSizes: ["120x180 cm", "160x230 cm", "200x290 cm"],
    features: [
      "Görsel derinlik katan mimari desenler",
      "Işığa göre renk değiştiren lüks bambu ipeği doku",
      "Mobilyaların altını vurgulayan sanatsal çerçeve",
      "Uzun ömürlü yüksek yoğunluklu dokuma",
    ],
    careTips: [
      "Haftalık düzenli süpürünüz.",
      "Lekelere renk vermeyen bezle tampon yapınız.",
    ],
    faqs: [
      {
        question: "Dekoratif halı hangi odalarda kullanılır?",
        answer:
          "Salon, oturma odası, çalışma odası veya antre gibi evin odak noktası olmak istenen tüm prestijli mekanlarında kullanılabilir.",
      },
      {
        question: "Renkleri mobilyayla nasıl eşleştirmeliyim?",
        answer:
          "Halıdaki tonlardan birini kırlent, tablo veya perdeyle eşleştirerek mekanda profesyonel bir iç mimari bütünlük yakalayabilirsiniz.",
      },
    ],
    relatedSlugs: ["salon-halisi", "vintage-hali", "sisal-hali", "outlet-urunler"],
  },
];

export function getAllCollections(): CollectionItem[] {
  return COLLECTIONS_DATA;
}

export function getCollectionBySlug(slug: string): CollectionItem | undefined {
  return COLLECTIONS_DATA.find((c) => c.slug === slug);
}

export function getRugsForCollection(item: CollectionItem): RugProduct[] {
  const all = getAllRugs();
  if (item.type === "kategori") {
    return all.filter(
      (r) =>
        r.category === item.targetName ||
        (r.categories && r.categories.includes(item.targetName as RugCategory)) ||
        (item.targetName === "Yolluk" && r.sizeOptions.some((s) => s.isRunner))
    );
  }
  return all.filter(
    (r) =>
      r.subcategory === item.targetName ||
      (r.subcategories && r.subcategories.includes(item.targetName as RugSubcategory))
  );
}

export function getRelatedCollections(currentSlug: string, limit = 4): CollectionItem[] {
  const current = getCollectionBySlug(currentSlug);
  if (!current) return COLLECTIONS_DATA.slice(0, limit);
  const related = current.relatedSlugs
    .map((s) => getCollectionBySlug(s))
    .filter((c): c is CollectionItem => Boolean(c));
  if (related.length >= limit) return related.slice(0, limit);
  const others = COLLECTIONS_DATA.filter(
    (c) => c.slug !== currentSlug && !related.some((r) => r.slug === c.slug)
  );
  return [...related, ...others].slice(0, limit);
}

