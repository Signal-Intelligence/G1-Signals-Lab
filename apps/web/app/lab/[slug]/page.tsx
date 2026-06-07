import { notFound } from "next/navigation";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { getLabPost, LAB_POSTS } from "@/lib/data/lab-posts";
import { pageMetadata } from "@/lib/metadata";
import type React from "react";

export function generateStaticParams() {
  return LAB_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLabPost(slug);
  if (!post) return {};
  return pageMetadata(post.title, post.excerpt, `/lab/${slug}`);
}

function parseInlineMarkup(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|`(.+?)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index} className="text-white">{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<code key={match.index} className="text-accent-blue text-[11px]">{match[2]}</code>);
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <div key={i} className="mt-6">
          <span className="eyebrow block mb-2">{`// ${block.replace("## ", "").toUpperCase()}`}</span>
        </div>
      );
    }
    return (
      <p
        key={i}
        className="mt-3 text-sm font-light text-text-secondary leading-relaxed"
      >
        {parseInlineMarkup(block)}
      </p>
    );
  });
}

export default async function LabPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLabPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={`// LAB — ${post.tag.toUpperCase()}`} title={post.title} subtitle={post.date} />
      <Section>
        <GlassPanel className="max-w-3xl p-5">
          <CardHeader label={post.tag.toUpperCase()} />
          <div className="callout-accent">
            {renderContent(post.content)}
          </div>
          <CardFooter timestamp={post.date} />
        </GlassPanel>
      </Section>
    </>
  );
}
