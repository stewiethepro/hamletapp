import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/24/outline'
import DashboardHeader from '@/components/header/DashboardHeader'
import DashboardHeaderMain from '@/components/header/DashboardHeaderMain'
import CardGridOne from '@/components/cards/CardGridOne'

const dummyUser = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]
const actions = [
  {
    icon: ClockIcon,
    name: 'Request time off',
    href: '#',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: BadgeCheckIcon,
    name: 'Benefits',
    href: '#',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: UsersIcon,
    name: 'Schedule a one-on-one',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
    icon: ReceiptRefundIcon,
    name: 'Submit an expense',
    href: '#',
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    icon: AcademicCapIcon,
    name: 'Training',
    href: '#',
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
]
const recentHires = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
]
const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout(props) {
    const { actionCards } = props.cards
    const { headerContent } = props
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <main className="pb-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-x-4 items-start lg:grid-cols-3 lg:gap-x-8 gap-y-2">
                
              {/* Row 1 Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <DashboardHeader
                headerContent={headerContent} 
                />
              </div>


              {/* Row 2 Left column */}

              <div className="grid grid-cols-1 gap-4 lg:col-span-1">
                <CardGridOne 
                    card={actionCards[0]}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-1">
                <CardGridOne 
                    card={actionCards[1]}
                />
              </div>


              {/* Row 2 Right column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Announcements */}
                <section aria-labelledby="announcements-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="announcements-title">
                        Announcements
                      </h2>
                      <div className="flow-root mt-6">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                          {announcements.map((announcement) => (
                            <li key={announcement.id} className="py-5">
                              <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <a href={announcement.href} className="hover:underline focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {announcement.title}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.preview}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Recent Hires */}
                <section aria-labelledby="recent-hires-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                        Recent Hires
                      </h2>
                      <div className="flow-root mt-6">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                          {recentHires.map((person) => (
                            <li key={person.handle} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                                  <p className="text-sm text-gray-500 truncate">{'@' + person.handle}</p>
                                </div>
                                <div>
                                  <a
                                    href={person.href}
                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                  >
                                    View
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2022 Hamlet Homes ltd.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}