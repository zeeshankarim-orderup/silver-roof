import type { Project } from "@/types";

/**
 * Placeholder imagery. Swap the files in /public/images/projects for the
 * company's own photographs and keep the same filenames - nothing else needs to
 * change. `category` is a translation key; no client or project names are used.
 *
 * Desktop layout is a fixed-row-height masonry (see Projects.tsx):
 *   [ A 7x2 ][ B 5 ]     [ D 4x2 ][ E 8 ]     [ G 5 ][ H 7 ]
 *            [ C 5 ]              [ F 8 ]
 */
export const projects: Project[] = [
  {
    id: "p1",
    image: "/images/projects/project-01.jpg",
    category: "windows",
    span: "col-span-2 lg:col-span-7 lg:row-span-2",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1600,
    height: 1200,
  },
  {
    id: "p2",
    image: "/images/projects/project-02.jpg",
    category: "doors",
    span: "col-span-2 sm:col-span-1 lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1200,
    height: 900,
  },
  {
    id: "p3",
    image: "/images/projects/project-03.jpg",
    category: "doors",
    span: "col-span-2 sm:col-span-1 lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1200,
    height: 900,
  },
  {
    id: "p4",
    image: "/images/projects/project-04.jpg",
    category: "painting",
    span: "col-span-2 sm:col-span-1 lg:col-span-4 lg:row-span-2",
    aspect: "aspect-[3/4] lg:aspect-auto",
    width: 900,
    height: 1200,
  },
  {
    id: "p5",
    image: "/images/projects/project-05.jpg",
    category: "kitchen",
    span: "col-span-2 sm:col-span-1 lg:col-span-8",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1600,
    height: 900,
  },
  {
    id: "p6",
    image: "/images/projects/project-06.jpg",
    category: "doors",
    span: "col-span-2 lg:col-span-8",
    aspect: "aspect-[16/9] lg:aspect-auto",
    width: 1600,
    height: 900,
  },
  {
    id: "p7",
    image: "/images/projects/project-07.jpg",
    category: "windows",
    span: "col-span-2 lg:col-span-7 lg:row-span-2",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1200,
    height: 900,
  },
  {
    id: "p8",
    image: "/images/projects/project-08.jpg",
    category: "kitchen",
    span: "col-span-2 lg:col-span-5 lg:row-span-2",
    aspect: "aspect-[4/3] lg:aspect-auto",
    width: 1400,
    height: 900,
  },
];
