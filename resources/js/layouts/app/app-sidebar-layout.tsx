import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { login, register } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { auth } = usePage<SharedData>().props;

    const { url } = usePage();
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                <div className="my-2 flex">
                    {!auth.user && (
                        <div className="flex">
                            <Link href={login()} className="mx-2 w-fit rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600">
                                Log in
                            </Link>
                            <Link href={register()} className="mx-2 w-fit rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600">
                                Register
                            </Link>
                        </div>
                    )}
                    {auth.user && url != '/posts/create' && (
                        <Link className="mx-2 w-fit rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600" href="/posts/create">
                            Create new Post
                        </Link>
                    )}
                    {url != '/posts' && (
                        <Link className="mx-2 w-fit rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600" href="/posts">
                            List of Posts
                        </Link>
                    )}
                </div>

                {children}
            </AppContent>
        </AppShell>
    );
}
