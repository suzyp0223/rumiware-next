import Link from "next/link";
import MyPageMenuGroup from "./MyPageMenuGroup";

const MyPageSideNav = () => {
  return (
    // 참고 stl 마이페이지
    <div className="tracking-wider">
      {MyPageMenuGroup.map((group) => (
        <div key={group.title} className="mb-10">
          <h1 className="font-bold text-lg mb-2 ml-1">{group.title}</h1>
          <div>
            <ul className="p-6 bg-peach-100 text-gray-700">
              {group.items.map((item) => (
                <li key={item.label} className="mb-2 hover:underline">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPageSideNav;
