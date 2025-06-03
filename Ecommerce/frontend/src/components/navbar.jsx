'use client'

import { Fragment, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import {
    Dialog, Popover, Tab, TabGroup, TabList, TabPanel, TabPanels,
    Transition, PopoverGroup, PopoverButton, PopoverPanel, DialogPanel, DialogBackdrop
} from '@headlessui/react'
import { HashLink } from 'react-router-hash-link'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const navigation = {
    categories: [
        {
            id: 'breads',
            name: 'Breads',
            featured: [
                { name: 'Sourdough', href: '/breads/sourdough', imageSrc: 'https://images.unsplash.com/photo-1649444719049-bc39a80cda65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyZWFkc3xlbnwwfHwwfHx8MA%3D%3D', imageAlt: 'Sourdough loaf' },
                { name: 'Baguette', href: '/breads/baguette', imageSrc: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWRzfGVufDB8fDB8fHww', imageAlt: 'Fresh baguette' },
            ],
            sections: [
                {
                    id: 'sweet-breads',
                    name: 'Sweet Breads',
                    items: [
                        { name: 'Cinnamon Rolls', id: '#bread' },
                        { name: 'Banana Bread', id: '#bread' },
                    ],
                },
                {
                    id: 'savory-breads',
                    name: 'Savory Breads',
                    items: [
                        { name: 'Ciabatta', id: '#bread' },
                        { name: 'Focaccia', id: '#bread' },
                    ],
                },
            ],
        },
        {
            id: 'pastries',
            name: 'Pastries',
            featured: [
                { name: 'Croissants', href: '/pastries/croissants', imageSrc: 'https://plus.unsplash.com/premium_photo-1715793630618-4480004a5bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNha2VzfGVufDB8fDB8fHww', imageAlt: 'Buttery croissants' },
                { name: 'Danishes', href: '/pastries/danishes', imageSrc: 'https://images.unsplash.com/photo-1635888070574-beb32aa9b06d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGNha2VzfGVufDB8fDB8fHww', imageAlt: 'Fruit danishes' },
            ],
            sections: [
                {
                    id: 'sweet-pastries',
                    name: 'Sweet Pastries',
                    items: [
                        { name: 'Fruit Tarts', id: '#pastries' },
                        { name: 'Éclairs', id: '#pastries' },
                    ],
                },
                {
                    id: 'savory-pastries',
                    name: 'Savory Pastries',
                    items: [
                        { name: 'Quiche', id: '#pastries' },
                        { name: 'Savory Puffs', id: '#pastries' },
                    ],
                },
            ],
        },
        {
            id: 'cakes',
            name: 'Cakes',
            featured: [
                { name: 'Chocolate Cake', href: '/cakes/chocolate-cake', imageSrc: 'https://plus.unsplash.com/premium_photo-1714669889975-90386fbb03e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXN8ZW58MHx8MHx8fDA%3D', imageAlt: 'Chocolate cake' },
                { name: 'Cheesecake', href: '/cakes/cheesecake', imageSrc: 'https://images.unsplash.com/photo-1626803775151-61d756612f97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNha2VzfGVufDB8fDB8fHww', imageAlt: 'Creamy cheesecake' },
            ],
            sections: [
                {
                    id: 'layered-cakes',
                    name: 'Layered Cakes',
                    items: [
                        { name: 'Red Velvet', id: '#cake' },
                        { name: 'Carrot Cake',id: '#cake' },
                    ],
                },
                {
                    id: 'mini-cakes',
                    name: 'Mini Cakes',
                    items: [
                        { name: 'Cupcakes', id: '#cake' },
                        { name: 'Mini Bundt',id: '#cake' },
                    ],
                },
            ],
        },
        {
            id: 'drinks',
            name: 'Beverages',
            featured: [
                { name: 'Coffee', href: '/drinks/coffee', imageSrc: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbmtzfGVufDB8fDB8fHww', imageAlt: 'Fresh coffee' },
                { name: 'Tea', href: '/drinks/tea', imageSrc: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D', imageAlt: 'Assorted teas' },
            ],
            sections: [
                {
                    id: 'hot-drinks',
                    name: 'Hot Drinks',
                    items: [
                        { name: 'Espresso', id: '#drink' },
                        { name: 'Latte', id: '#drink' },
                    ],
                },
                {
                    id: 'cold-drinks',
                    name: 'Cold Drinks',
                    items: [
                        { name: 'Iced Coffee', id: '#drink' },
                        { name: 'Iced Tea', id: '#drink' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
    ],
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const cartCount = useSelector((state) => state.cart.items.length)
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('userInfo')
        toast.success('Logged out successfully')
        navigate('/')
    }

    return (
        <div className="bg-amber-50 sticky top-0 z-50 shadow-sm">
            {/* Top announcement bar */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-900 py-2 text-center text-sm font-medium text-white">
                <p>Get free delivery on orders over $100</p>
            </div>

            <header className="relative bg-white shadow-sm">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div className="border-b border-gray-100 ">
                        <div className="flex h-16 items-center justify-between">
                            {/* Mobile menu toggle */}
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="rounded-md p-2 text-gray-700 lg:hidden"
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="flex flex-1 lg:flex-none">
                                <Link to="/" className="flex items-center">
                                    <img src="/images/logo.svg" alt="Bakery Logo" className="h-10 w-auto" />
                                    <span className="ml-2 text-xl font-bold text-amber-800">ArtisanBake</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden h-full lg:flex lg:items-center">
                                <PopoverGroup className="ml-8">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <PopoverButton className={`relative flex items-center border-b-2 px-1 pt-px text-sm font-medium transition-colors duration-200 ${open
                                                                    ? 'border-amber-600 text-amber-900'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800'
                                                                }`}>
                                                                {category.name}
                                                            </PopoverButton>
                                                        </div>

                                                        <Transition
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <PopoverPanel className="absolute inset-x-0 top-full z-10 bg-white shadow-lg">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base">
                                                                                    <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <Link
                                                                                        to={item.href}
                                                                                        className="mt-4 block font-medium text-gray-900"
                                                                                    >
                                                                                        <span className="absolute inset-0 z-10" />
                                                                                        {item.name}
                                                                                    </Link>
                                                                                    <p className="mt-1 text-sm text-gray-500">Shop now</p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul className="mt-4 space-y-4">
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                {item.id ? (
                                                                                                    <HashLink
                                                                                                        to={`${location.pathname}${item.id}`}
                                                                                                        className="text-gray-500 hover:text-gray-800"
                                                                                                        scroll={(el) =>
                                                                                                            el.scrollIntoView({ behavior: 'smooth' })
                                                                                                        }
                                                                                                    >
                                                                                                        {item.name}
                                                                                                    </HashLink>
                                                                                                ) : (
                                                                                                    <Link
                                                                                                        to={item.href}
                                                                                                        className="text-gray-500 hover:text-gray-800"
                                                                                                    >
                                                                                                        {item.name}
                                                                                                    </Link>
                                                                                                )}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </PopoverPanel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}

                                        {navigation.pages.map((page) => (
                                            <Link
                                                key={page.name}
                                                to={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                            >
                                                {page.name}
                                            </Link>
                                        ))}
                                    </div>
                                </PopoverGroup>
                            </div>

                            {/* Right-side icons */}
                            <div className="flex flex-1 items-center justify-end">
                                {/* Auth/User links */}
                                <div className="hidden lg:flex items-center space-x-4">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Welcome, {user?.name || user?.email}
                                                </span>
                                                <Link
                                                    to="/my-orders"
                                                    className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                                                >
                                                    My Orders
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                                                >
                                                    Sign out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/signin"
                                                className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root">
                                    <Link
                                        to="/cart"
                                        className="group -m-2 flex items-center p-2"
                                    >
                                        <div className="relative">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-amber-700"
                                                aria-hidden="true"
                                            />
                                            {cartCount > 0 && (
                                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-medium text-white">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="ml-2 hidden text-sm font-medium text-gray-700 group-hover:text-gray-800 lg:block">
                                            Cart
                                        </span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <Dialog open={open} onClose={setOpen} className="lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                            <div className="flex px-4 pt-5 pb-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <TabGroup className="mt-2">
                                <TabList className="-mb-px flex space-x-4 border-b border-gray-200 px-4">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className={({ selected }) =>
                                                `flex-1 border-b-2 py-4 text-[15px] font-medium ${selected
                                                    ? 'border-amber-600 text-amber-600'
                                                    : 'border-transparent text-gray-700'
                                                }`
                                            }
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                                <TabPanels>
                                    {navigation.categories.map((category) => (
                                        <TabPanel key={category.name} className="space-y-12 px-4 py-6">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                                                            <img
                                                                src={item.imageSrc}
                                                                alt={item.imageAlt}
                                                                className="object-cover object-center"
                                                            />
                                                        </div>
                                                        <Link
                                                            to={item.href}
                                                            className="mt-4 block font-medium text-gray-900"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <p className="mt-1 text-sm text-gray-500">Shop now</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p className="font-medium text-gray-900">{section.name}</p>
                                                    <ul className="mt-4 space-y-4">
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                {item.id ? (
                                                                    <HashLink
                                                                        to={`${location.pathname}${item.id}`}
                                                                        className="-m-2 block p-2 text-gray-500"
                                                                        onClick={() => setOpen(false)}
                                                                        scroll={(el) =>
                                                                            el.scrollIntoView({ behavior: 'smooth' })
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </HashLink>
                                                                ) : (
                                                                    <Link
                                                                        to={item.href}
                                                                        className="-m-2 block p-2 text-gray-500"
                                                                        onClick={() => setOpen(false)}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </TabGroup>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <Link
                                            to={page.href}
                                            className="-m-2 block p-2 font-medium text-gray-900"
                                            onClick={() => setOpen(false)}
                                        >
                                            {page.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flow-root">
                                            <div className="flex items-center space-x-2">
                                                <UserIcon className="h-5 w-5 text-gray-700" />
                                                <span className="font-medium text-gray-900">
                                                    Welcome, {user?.name || user?.email}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flow-root">
                                            <Link
                                                to="/my-orders"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                                onClick={() => setOpen(false)}
                                            >
                                                My Orders
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <button
                                                onClick={() => {
                                                    handleLogout()
                                                    setOpen(false)
                                                }}
                                                className="-m-2 block w-full text-left p-2 font-medium text-gray-900"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flow-root">
                                            <Link
                                                to="/signin"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                                onClick={() => setOpen(false)}
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link
                                                to="/register"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                                onClick={() => setOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </header>
        </div>
    )
}