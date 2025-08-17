"use client";
import { useState } from "react";
import Typography from "../atoms/Typography";
import cn from "@/shared/utils/cn";

const menuList = [
  { icon: "bi bi-asterisk", text: "전체" },
  { icon: "bi bi-eye-slash", text: "읽지 않음" },
  { icon: "bi bi-star", text: "즐겨찾기" },
  { icon: "bi bi-bell", text: "알림 설정" },
];

const folders = [
  {
    id: 1,
    name: "업무",
    children: [
      { id: 1, name: "개발 자료" },
      {
        id: 2,
        name: "디자인 참고",
      },
    ],
  },
  {
    id: 2,
    name: "개인",
    children: [{ id: 1, name: "학습" }],
  },
  { id: 3, name: "아카이브" },
];

interface childrenFolderType {
  id: number;
  name: string;
  children?: { id: number; name: string; children?: [] }[];
}

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const [childrenFolder, setChildrenFolder] = useState<childrenFolderType[]>([
    {
      id: 0,
      name: "",
      children: [],
    },
  ]);
  const [isOpenFolder, setIsOpenFolder] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [selectedChildrenFolder, setSelectedChildrenFolder] =
    useState<string>("");

  const handleClickMenu = (text: string) => {
    setSelectedMenu(text);
  };

  const handleClickeFolder = (folder: childrenFolderType) => {
    if (folder.children) setChildrenFolder(folder.children);
    else setChildrenFolder([]);
    setSelectedFolder(folder.name);
    setIsOpenFolder((prev) => !prev);
  };

  const handleClickFolderMenu = (name: string) => {
    setSelectedChildrenFolder(name);
  };

  return (
    <aside className="w-80 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200 border-r h-screen overflow-y-auto">
      <div className="px-4 mt-30 mb-10">유저 정보 들어갈 예정</div>
      <div className="border-b border-gray-200">
        <div className="px-4">
          <Typography.P1 className="font-semibold">빠른 필터</Typography.P1>
        </div>
        <div className="p-3">
          {menuList.map((menu) => (
            <div
              onClick={() => handleClickMenu(menu.text)}
              key={menu.text}
              className={cn(
                selectedMenu === menu.text
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100",
                "flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer transition-all"
              )}
            >
              <i className={menu.icon} />
              <Typography.P1
                className={cn(selectedMenu === menu.text ? "text-white" : "")}
              >
                {menu.text}
              </Typography.P1>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6">
        <div className="px-4">
          <Typography.P1 className="font-semibold">폴더</Typography.P1>
        </div>
        <div className="p-3">
          {folders.map((folder) => {
            const openFolder = folder.name === selectedFolder && isOpenFolder;
            return (
              <div key={folder.id}>
                <div
                  onClick={() => handleClickeFolder(folder)}
                  className="flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {openFolder ? (
                    <div className="flex gap-2">
                      <i className="bi bi-chevron-down" />
                      <i className="bi bi-folder2-open" />
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <i className="bi bi-chevron-right" />
                      <i className="bi bi-folder" />
                    </div>
                  )}
                  {folder.name}
                </div>
                {openFolder &&
                  childrenFolder.map((childrenFolder) => (
                    <div key={childrenFolder.id} className="pl-9">
                      <div
                        onClick={() =>
                          handleClickFolderMenu(childrenFolder.name)
                        }
                        className={cn(
                          selectedChildrenFolder === childrenFolder.name
                            ? "bg-blue-500 text-white"
                            : "bg-white hover:bg-gray-100",
                          "flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer transition-all"
                        )}
                      >
                        <i className="bi bi-folder text-sm" />
                        <Typography.P1
                          className={cn(
                            "text-sm",
                            selectedChildrenFolder === childrenFolder.name
                              ? "text-white"
                              : ""
                          )}
                        >
                          {childrenFolder.name}
                        </Typography.P1>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
