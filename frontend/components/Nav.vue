<template>
    <div class="flex py-8 items-center">
        <div class="w-3/4 flex gap-3">
            <NuxtLink to="/dashboard">LOGO</NuxtLink>
            <div class="flex gap-3 hidden md:flex">
                <NuxtLink to="/books">Books</NuxtLink>
                <NuxtLink to="/my-books">My Books</NuxtLink>
                <NuxtLink to="/upload">Upload Book</NuxtLink>
            </div>
        </div>
        <div class="flex justify-end w-1/4">
            <Button class="bg-slate-100 hidden md:block">Log out</Button>

            <div class="block md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Button>menu</Button>
                    </SheetTrigger>
                    <SheetContent class="bg-white">
                        <div class="grid gap-4 mt-5">
                            <NuxtLink to="/dashboard">Home</NuxtLink>
                            <NuxtLink to="/books">Books</NuxtLink>
                            <NuxtLink to="/my-books">My Books</NuxtLink>
                            <NuxtLink to="/upload">Upload Book</NuxtLink>
                            <Button class="bg-slate-100">Log out</Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>

    <hr />
</template>

<script setup lang="ts">
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
</script>

<style scoped></style>
