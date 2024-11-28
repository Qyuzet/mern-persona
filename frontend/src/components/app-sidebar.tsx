// @ts-nocheck
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const storedUserData = localStorage.getItem("userData");
const userData = storedUserData ? JSON.parse(storedUserData) : null;

// This is sample data.
const data = {
  user: {
    name: userData?.username,
    email: userData?.email,
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: `${userData?.username?.split(" ")[0]} Corp`,
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Action",
      url: "#",
      icon: AudioWaveform,
      isActive: true,
      items: [
        {
          title: "Set Cases",
          url: "/case",
        },
      ],
    },
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Alpha",
          url: "/alpha",
        },
        {
          title: "Explorer",
          url: "/explorer",
        },
        {
          title: "Quanta",
          url: "/quanta",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/introduction",
        },

        {
          title: "Tutorials",
          url: "/tutorials",
        },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/general",
        },
        {
          title: "Team",
          url: "/team",
        },
        {
          title: "Billing",
          url: "/billing",
        },
        {
          title: "Limits",
          url: "/limits",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
