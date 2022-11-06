import { supabaseClient, supabaseServerClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react'
import { getLayout } from "@/components/layout/AppLayout";
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import CardGridThree from "@/components/cards/CardGridThree";
import DashboardHeader from "@/components/header/DashboardHeader";
import { pages } from "@/utils/segment/constants/pages";
import { trackUserIdentify } from "@/utils/segment/track";

const cards = {
      primaryCard:
        {
          name: 'Join',
          description: 'Get pre-approved as a Hamlet resident',
          imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-jennifer-enujiugha-5157287.jpg',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          href: '/resident/apply',
          color: 'indigo-500',
        },
      secondaryCards: 
        [
          {
            name: 'Discover',
            description: 'View available Hamlet homes',
            imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/house/pexels-rotekirsche-5438826.jpg',
            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
            href: '/homes',
            color: 'yellow-500',
          },
          {
            name: 'Connect',
            description: 'Chat to the Hamlet team',
            imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-andrea-piacquadio-846741.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '#',
            color: 'teal-500',
          },
        ]
  }

export default function ResidentDashboard({data, navData, headerContent}) {
    const { user, error } = useUser();
    const profile = data.profile

    useEffect(() => {
      if (user && profile) {

        const traits = {
          id: user.id, 
          email: user.email, 
          name: profile.first_name + " " + profile.last_name,
          first_name: profile.first_name,
          last_name: profile.last_name,
          user_type: profile.user_type
        }
  
        trackUserIdentify(traits)
      }
    }, [])

    return (
      <>  
        <DashboardHeader user={user} data={profile} headerContent={headerContent}/>
        <CardGridThree cards={cards}/>
      </>
    )
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/auth/sign-in',
    async getServerSideProps(ctx) {
      // Run queries with RLS on the server
      const { data: profile, error: profileError } = await supabaseServerClient(ctx)
      .from('profiles')
      .select('*')
      .single();

      const data = { profile }

      const navData = {
        navigation: [
            {name: "Dashboard", href: "/resident/dashboard", current: true},
            {name: "Apply", href: "/resident/apply", current: false},
            {name: "Flatmates", href: "/resident/flatmates", current: false},
            {name: "Homes", href: "/homes", current: false},
        ],
        userNavigation: [
            {name: "Profile", href: "/profile", onClick: "#"},
            {name: "Settings", href: "/settings", onClick: "#"},
        ],
    }

    const headerContent = {
      title: "Welcome Home", 
      main: "Hey " + data.profile.first_name + " 👋",
      description: "",
      button: "",
    }

      return { props: { data, navData, headerContent } };
    }
  });

ResidentDashboard.getLayout = getLayout;

ResidentDashboard.pageName = pages.resident.dashboard.name
ResidentDashboard.pageCategory = pages.resident.dashboard.category