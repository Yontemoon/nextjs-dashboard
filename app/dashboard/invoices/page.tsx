import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table"
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { Lusitana } from "next/font/google";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";

const Page = async ({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) => {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query)

    return (
        <div>
            <div>
                <h1>Invoices</h1>
            </div>
            <div>
                <Search placeholder="Search Invoices..."/>
                <CreateInvoice/>
            </div>
             <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
        </div>
    );
};

export default Page;