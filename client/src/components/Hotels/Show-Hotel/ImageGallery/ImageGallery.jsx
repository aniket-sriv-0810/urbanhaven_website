import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImageGallery = () => {
  const images = [
    { id: 1, src: "https://media-hosting.imagekit.io//339b29f8d32c48b3/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2V57jrTYNxu9xZaE-qMkBPVhDk07jGXxcRhglSIMPwncDz2IIeMNEfI~NyjbsYICDukYh6keLzbAjieZx0M1NixnK~yOGsCzfdse22pzIvRBFpW75IIEbqV-Juw-2nCyDEWcydSeLbnWNuWwASLai7wEyVa0xUwNYNElpvzkPtTM99k6idIVmXFHTutNK9lW5CZd6gwoHUGSsyqOlQ~c1a0ADjuRiijN~10lAUzvNlLP9OwSaH5z~-wiRjusGH6SNMKVeaV~Cw59suNZaRmTXBPFsHzB6Ojr881FtutnPdULCyuA-msi23lvu02Ewzhu3Cr1Ue7HNMs0Vg2dAQpBLA__", alt: "Bed Room - 01" },

    { id: 2, src: "https://media-hosting.imagekit.io//eb49dde6fe8b44eb/view-romantic-castle-bedroom-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=dbpcO4OQtDZO5Cd6nQZPaGUHS-ZIaQhZsfX2NkCLCvhQsiI7ILMCU~t~BH-MqqA7n-46Ehzw3S-SOf5OoaRu1MAQgOzeOYnobfCtdEdLIEfcjCn0YVxF25kirYAwtHuzt5zRUr9Oi6N~Yicrz5oajMOsClBBJaYtXW2sXzava96Jefn3FCb6zo~iQVcuT2cRUnEoUWhqCpVR7YvYBE0giga4bPfZ9Mium~4qEk3q5-b8YiMy3~vFtIGf-9murW9OCL18FC7PBQ9x8fQEwMuZU5uO640qHxPIcs69FPWDsJfjbICXJ8aXVvYw4JQ3o4rEpebrkXGP5YlY6Cy0XirrGQ__", alt: "Bed Room - 02" },

    { id: 3, src: "https://media-hosting.imagekit.io//a0608748692f4066/luxury-bedroom-interior-with-rich-furniture-scenic-view-from-walkout-deck-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=X7OXEelETsLcyurXyZIHBZQkei71ewb8Zp9ieNUVw00sHMwE4oo63v2Qln~Yy-vEU~vKJvtAkLSmb7-0Lbx9uo62oZNaKz~7HpY6P-Y3W~dbWu~0dLPFtZsVEo7EKObqpHa7LxTnAku0PcivwGrd2iQyKSYnS~o5lPJYif7cpGA7EMzdAZzdhf9a6VJIgKzSegIi7KllV8uOhwki5LzhUVL95rQzupNpOPrHgADV56Zb16T-9JVFNffKrGBENNHbPGHGBzA4-KUSgoW4kwqmVltjXk3weQ94ibkQ-ll0Al~Dadbk99u8Ws5E7OVyatNUbqrU4rQvTfkMANn-CKzFjw__", alt: "Bed Room - 03" },

    { id: 4, src: "https://media-hosting.imagekit.io//fef17ecf82f74d73/interior-modern-comfortable-hotel-room-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QuM-qQ7XJpkfpw-xstP1FLR1QjB4IGh2I3Crc56uZDg9euPXxpCVyibAGtbIaNJAf-~GS6LI6ROx~~J7idm5zOGBIXGbobIVIrb0RaQGPxGaehY1VPYrqL0iBkBWevnl4xK4yQPRs-SsYxA0E7-E6bI6gjYTwERkG~fXdFtPqhlkjqWLGGP5tKOOCbyV2syZw9EPd294Rosahvb2QNJbPTEQeof66vzjy2SrJF5op-DVzCOIMWB7zsRTTfh2y4h4GiL2c4fAft4EsST8thDFYjCKLtv3She-O-DPc1FKRt3zHVcb16ulMDQrxVp20QSgggg5ZPLxXXdTfMerPiBeFw__", alt: "Bed Room - 04" },

    { id: 5, src: "https://media-hosting.imagekit.io//c4ab5d2d35084518/3d-rendering-modern-bathroom-with-luxury-tile-decor-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TQ3E4y6KYsKQF83seCsZrln5DKBzpEd2jrF~RxMG-nt9PkXWmYuI3Sfqz1lo9VPAR~-BmU~kf7Z7Y-qhWZI0JltByF7GKKR7lWjtE1kmz8oK5SgItQP8i7mYrB2W-3nr8qY9-gcLi098IzvEBv~wabH-6oc7zoZKF--Ldvk0v90o~gBb6PZhxTUKJ8pfUIofaKx-aTG2Yyc5ewhhzRCQ1y7-gb-CfKiSWvoPmVh6XnEbxP2AWGYDHyvxH7~SDwkkKrybRvZ-QrlIEIGlOkvDVBAXr30rgHBFA4Wr70dh51nLKuTwn95kB~drXoZIEcfV94Ujqikj4e39qXb4~NG1iA__", alt: "Washroom - 01" },

    { id: 6, src: "https://media-hosting.imagekit.io//35d4b440d89b4cde/luxury-bathtub-inside-bedroom-hotel-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=scNOj1kn4rCesyftyibK5e2cvQuP1OQ-4PzMa2396jmzQVCsfgsLDBNK78vwwwUjlPAr011qDZ9C9dIF76oP1Rn3RSri0kHuQDouDpTVteR96dKGZDySSQvU4yQ1s6lT-MsZS9CDFCaKEZ9KolEdF4YuymqSy8CNxtkiZohyD-KG1D7BGI1HjsYAQprfMSMCl-qeBlwcRrbFqEsf-LIDhHLqBSuXLHeH6gJLAWWFMYk~7x5s563C9bB~5CQhLGQ9BvAwAWE5AxWE7LVFaVdcpfdsht3Al2XLP20H0VdluZYdIt7FoNRzs9RrhMfZUk53IOgMxwsz5asFhNieHCrudg__", alt: "Washroom - 02" },

    { id: 7, src: "https://media-hosting.imagekit.io//bc429f9a653848be/small-bathroom-decorated-modern-style-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=zcAs3CPrKNaPw4iSAqai76D0ra4aHbbgMxVMC52pL~NgInGP8I77rn7-EZIgLnoRTtNmY8Pzh70E7iuzaJmWVtfDy95OQsSTiPyQVrsprUkZCBTE0Hfkbs6E0e4Pqia0IcKp5TNPaHBn~sqJyPCiKgse9OLRhYxYP4Z-Hv~Cu0d2Detw8wz54QkKupnAfuA3fnpLFmLhsFpYmVKrnxYAPov6AXn2phzkTDoTkwzSAJoSiNvuCWoVQ1USRIC8t88Upk6Nm9KTnjEfbZc23X8c4xXJvgmv235JE6LKJRERxUtGe1c1D7raM8fb9782dVveyVYILfIDLI9D-ndboY604g__", alt: "Washroom - 03" },

    { id: 8, src: "https://media-hosting.imagekit.io//c675786cec6c4bf4/small-bathroom-with-modern-style-decor-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W~TuKs~~bdDZ-7Bw~4y-9H2cuS7K~Gu5tRdM9bWo7UJ6Jt-IWiS~XEowRSXa0jItGXXjerW0IxhSu35yXBB9rYUIvT2f8s2rdQyL~POvH3cA~j8ZgP3ksEVJ0v5Kvvqb-FWdkhaXGPbHqdkWKD64HMJMCh637AlDa6r3WB65tykFYaHenw2cNfuB1S~oUzhkKzpuwOKHbn6DvEgmFCH5tnmqlriOINT5ztpzG9mAjLP2dC-ZMXezwp5oWBThwzxRlfQ-yUxZiPQiIUxyKw72syn0bCsnbSwcknYv2-WE8oXYx7CA8zJ7Ii4IIqqIIOKesjgKKydZBvCbbgdOvfMh4w__", alt: "Washroom - 04" },

    { id: 9, src: "https://media-hosting.imagekit.io//1f0003e47b554e16/view-luxurious-hotel-interior-space-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=rgpTlCtvla7~GlplY5B9olF1xf9T3hFvRXXndT85cH1CV~10QJhAlk-TQVHpSjXlxAYfO0rB14JXHjQFFDaIXSrqr-NdrKrfBQbC1o2thvuX5E-~TVFYmKRhaAnxu11Ew5YdCeVsbG9hvw~r2HGqWu83EUlG4MoP0Qmjwz-~JpybAvpj5Y4wkCeuJPZosTYJvaRQi4R4EYN7kowzOGnIIVMflP3NI5ckLSzXeUMWK7zhWr1r8hYY8pkX2MmGl5y3Zi~xmva7qeV4o8ddydy36CPDFS9GxAGo~q-SeW1fEq6XkUn1lx7LAc7glBjnub05gzdUXSlthNuVDR3u0fQ3hg__", alt: "Lobby Area - 01" },

    { id: 10, src: "https://media-hosting.imagekit.io//586ecfc8dac04039/luxury-hotel-reception-hall-lounge-restaurant-with-high-ceiling-min-min.jpg?Expires=1836891556&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ngCLzWa-EYbZnLgUVcABmp8pZQEKgPA-u-ziul8GIVXF97gPPySuCZLGthILEF9HS~CyfufShTlOxtbra4rUlMNUnElvOI92l1nsupgPiRA4VzYrubbHl2fzDMS230jYFEtQ-Ag-7lCUt9Zr~ERPEvcrH1ibt6Hwtf9J2KECmCZeNqWw2jhyDRMki1ITcJXCAUu40vSz~v4CSl0WOe3pQfV2n2flQ2hG8kv65DrEzH5-KYYxAzSruCw3KJLlg0Ksr3rGvEVhD7gLob9qSMjmh-tOpnH9-hIy6FjiB1bDmcdsvjh~YqazJUm-5dl~aBJ2BIaAIz8Keqn6hUBrn58L4Q__", alt: "Lobby Area - 02" },

    { id: 11, src: "https://media-hosting.imagekit.io//969546556fe34f6a/summer-restaurant-mediterranean-coast-beautiful-sunset-tekirova-kemer-turkey-min.jpg?Expires=1836892415&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=A1aiIMUKbKwX3CGlwr78bte~XhL0lqgBp1TTxje2scsxoQEuHaTUw4xIV8ajdncXB9xoJOQSjhHASTWwv3eZi5G9aI-q19PUb05Lt7aikcwocmQ8Y~6c3sLVUc3Mtp7JaK~s4EMi~tudfqZfAoLqZyisAduEIX9eHc1Z-dNwNU5vz8B-DW8Jmkqglprt4pn-U-YEbZfpssd0zjCf3P7Mwr40L7LnVyEcpCatOC0tPbYVe2IhSNoiYTzKKus91b99IUG~oTNfrrxwYgnDyDzJEhbtvk33VpT7~8lyVaGlEsT2Ekq5eMpq8dbguDvX~AEfM7xk~ItaUT0-lRKWq2Yqng__", alt: "Terrace Area - 01" },

    { id: 12, src: "https://media-hosting.imagekit.io//348f2c37c8924be0/umbrella-chair-min.jpg?Expires=1836892415&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=eUOwF9A534Dg5bHIiMpucWsThZSEW1nDUF-TyyvKO1vqR7topkr-IAEFbgv1J8KnTLKn87zmn9pwpmM8Y0wMAXT4ZoODWPNcqhoQ5-rcRbgsybT-QsJtYvv-IDdCIqvqyvAoHo6jf8TwwbrlS~Ojs99uYC9UbzluuRZLMwJBOi-MoJwWCHc7O6tNoNnKxQWIvQKSV1Xedadx1ea0iTr60jRImEHH1bjmFQKsoLzW~ne65nAAKkkSbcyUVJS00BM0~OWRZYBdaXUsujCtnZcV5WLXNCW9qLIsp1n01BIZohQDbvRnqKiv~7Gl~vvI3knmOlSHOxosLxw51B8mcxebAA__", alt: "Terrace Area - 02" },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loadingStates, setLoadingStates] = useState(
    images.reduce((acc, img) => ({ ...acc, [img.id]: true }), {})
  );

  const handleImageLoad = (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };
  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeLightbox = () => setSelectedImageIndex(null);

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
    {/* Gallery Title */}
    <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
      A Glimpse Inside UrbanHaven
    </h1>
  
    {/* Thumbnails with Horizontal Scrolling for Mobile */}
    <div className="flex gap-8 overflow-x-auto p-1 no-scrollbar sm:flex-wrap justify-center">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-56 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-300"
          onClick={() => setSelectedImageIndex(index)}
        />
      ))}
    </div>
  
    {/* Image Grid */}
    <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative w-full h-64">
          {loadingStates[image.id] && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          )}
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
              loadingStates[image.id] ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => handleImageLoad(image.id)}
          />
        </div>
      ))}
    </div>
  
    {/* Lightbox */}
    {selectedImageIndex !== null && (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
        {/* Lightbox Container */}
        <div className="relative max-w-4xl w-full p-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-1 md:top-7 md:right-7 border-white border-2 md:p-2 rounded-full text-white text-2xl hover:text-red-500 hover:border-red-500 transition duration-300"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
  
          {/* Previous Button */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-60 rounded-full p-3 hover:bg-gray-700 transition duration-300"
            onClick={handlePrevious}
          >
            <FaArrowLeft />
          </button>
  
          {/* Selected Image */}
          <img
            src={images[selectedImageIndex]?.src}
            alt={images[selectedImageIndex]?.alt}
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition-transform duration-500"
          />
  
          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-60 rounded-full p-3 hover:bg-gray-700 transition duration-300"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default ImageGallery;
