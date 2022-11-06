import { supabase, createResidentGroup } from "@/utils/supabase";
import { supabaseClient, supabaseServerClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { getLayout } from "@/components/layout/AppLayout";
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import CardGridOne from "@/components/cards/CardGridOne";
import DashboardHeader from "@/components/header/DashboardHeader";
import { pages } from "@/utils/segment/constants/pages";
import { trackUserIdentify } from "@/utils/segment/track";
import { get, post } from "@/utils/api/request";

const applyCard = {
  name: 'Start Application',
  description: 'Click here to get started',
  imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-andrea-piacquadio-853151.jpg',
  imageAlt: 'Happy couple checking computer with lights in background',
  href: '/resident/apply/start',
  color: 'to-indigo-500',
  opacity: 'opacity-30',
}
const goToDashCard = {
  name: 'Check Status',
  description: 'Click here to go to your Dashboard',
  imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-andrea-piacquadio-935743.jpg',
  imageAlt: 'Happy couple on phone waiting by front door with boxes.',
  href: '/resident/dashboard',
  color: 'to-indigo-500',
  opacity: 'opacity-30',
}

export default function ResidentApply({data, navData, headerContent}) {
    const { user, error } = useUser();
    const profile = data.profile

    useEffect(() => {
      if (user && profile) {
        console.log("user and profile")

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
        
      {(profile.status === 'prospect' || profile.status === 'not_in_region') ? 
      
      <>
        <CardGridOne card={applyCard}/>
      </>

      :

      <>
        <CardGridOne card={goToDashCard}/>
      </>
      }
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
            {name: "Dashboard", href: "/resident/dashboard", current: false},
            {name: "Apply", href: "/resident/apply", current: true},
            {name: "Flatmates", href: "/resident/flatmates", current: false},
            {name: "Homes", href: "/homes", current: false},
        ],
        userNavigation: [
            {name: "Profile", href: "/profile", onClick: "#"},
            {name: "Settings", href: "/settings", onClick: "#"},
        ],
    }

    console.log(profile.status);

    const headerContent = (profile.status === 'prospect' || profile.status === 'not_in_region') ?  
      {
        title: "Resident Application", 
        main: "We just need a few details",
        description: "This shouldn't take more than 5-10 mins, we've broken it up into nice little steps.",
      }
      :
      {
        title: "Resident Application", 
        main: "Thank you for your application 🤝",
        description: "You can check on the status of your application in your dashboard.",
      }
    
      return { props: { data, navData, headerContent } };
    }
  });

ResidentApply.getLayout = getLayout;

ResidentApply.pageName = pages.resident.apply.index.name
ResidentApply.pageCategory = pages.resident.apply.index.category