function BlogCaption({ title, paragraphs, publishDate }) {
  return (
    <ul>
      <li className="pb-2">
        <span>
          <strong>{title}</strong>
        </span>
      </li>
      {paragraphs}
      <li className="text-blog_accent">{publishDate}</li>
    </ul>
  );
}

export default function BlogText({ title, paragraphs, publishDate }) {
  return (
    <div className="text-left pl-3 pr-3 pb-3 max-w-[28.125rem] md:max-w-[25rem] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem] md:max-h-[45rem] md:overflow-y-auto overflow-x-hidden md:mb-4">
      <BlogCaption
        title={title}
        paragraphs={paragraphs}
        publishDate={publishDate}
      />
    </div>
  );
}
