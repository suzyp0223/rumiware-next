import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col min-h-screen m-0 p-0">
      {/* Main Content */}
      {/* <div className="flex-grow overflow-y-auto">
        <p className="text-center py-4">무한 스크롤 콘텐츠</p>
        <div className="h-[2000px] bg-gray-50">
          <p className="text-center pt-4">스크롤 가능한 콘텐츠가 여기에 있습니다.</p>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="text-center border-t border-[var(--color-red-200)] mt-auto shadow-top">
        <div className="flex flex-row justify-center items-center gap-20 text-gray-800 text-base mt-4">
          {/* Left: Info */}
          <p className="text-xl font-bold ">
            <Link href="/" className="hover:text-[var(--color-red-200)]">
              LumiWare 루미웨어
            </Link>
          </p>

          <div className="flex flex-col text-sm text-gray-700">
            <p className="flex items-center">
              <Image
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                className="w-4 h-4 mr-2"
                alt="이멜"
              />
              suzyp0223@gmail.com
            </p>
            <p className="flex items-center p-2 mr-2">
              <Image
                src="https://www.svgrepo.com/show/111201/phone-call.svg"
                alt="Phone"
                className="w-4 h-4 mr-2"
              />
              010.3395.0640
            </p>
            <p className="text-xs text-gray-500">&copy; &nbsp;박수지. All Rights Reserved.</p>
          </div>

          {/* Center: Resume & Blog & GitHub */}
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 hover:text-[var(--color-red-200)]"
              >
                <Image
                  src="https://www.svgrepo.com/show/137446/resume.svg"
                  alt="이력서"
                  className="w-4 h-4"
                />{" "}
                이력서
              </a>
            </p>
            <p>
              <a
                href="https://ppojjakcoding.tistory.com"
                target="_blank"
                className="flex items-center gap-2 hover:text-[var(--color-red-200)]"
              >
                <Image
                  src="https://t1.daumcdn.net/tistory_admin/favicon/tistory_favicon_32x32.ico"
                  alt="티스토리 아이콘"
                  className="w-4 h-4"
                />
                뽀짝코딩
              </a>
            </p>
            <p>
              <a
                href="https://github.com/suzyp0223?tab=repositories"
                target="_blank"
                className="flex items-center gap-2 hover:text-[var(--color-red-200)]"
              >
                <Image
                  src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
                  alt="GitHub"
                  className="w-4 h-4"
                />
                github.com/suzyp0223
              </a>
            </p>
          </div>
        </div>

        <div className="bg-gray-100 flex flex-col flex-wrap justify-center items-center h-[5rem] mt-4">
          <p className="text-sm">Img Source</p>
          <div className="flex items-center flex-wrap">
            {[
              "https://unsplash.com/favicon-32x32.png",
              "https://www.pexels.com/assets/static/images/meta/pexels-icon.png",
              "https://pixabay.com/favicon-32x32.png",
              "https://cdn.shopify.com/shopifycloud/growth_tools/assets/global/favicon-ab7018e1fe708a49edcfecce3166032fbeeb1fd7ba4a078c366de344d32ee193.png",
              "https://cdn-front.freepik.com/favicons/favicon.svg?v=2",
              "https://static2.rawpixel.com/_next/static/images/rawpixel-logomark-black-394a2cad2aa430631a56cc6b871d6ca1.png",
              "https://img.icons8.com/ios-filled/50/000000/camera.png",
              "https://www.lifeofpix.com/dist/favicon-32x32.png",
            ].map((src, i) => (
              <a
                href="#"
                key={i}
                target="_blank"
                className="m-5 h-2 hover:bg-[var(--color-red-200)]"
              >
                <Image
                  src={src}
                  alt="source-icon"
                  className="w-4 h-4 hover:brightness-[2.2] hover:bg-[var(--color-red-200)]"
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
