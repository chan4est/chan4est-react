function BlogCaption({ title, paragraphs, publishDate }) {
  return (
    <ul>
      <li className="pt-2 lg:pt-0 pb-3">
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
    <div className="text-left pl-3 pr-3 pb-3 max-w-[450px] md:max-w-[400px] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem] md:max-h-[720px] md:overflow-y-auto overflow-x-hidden md:mb-6">
      <BlogCaption
        title={title}
        paragraphs={paragraphs}
        publishDate={publishDate}
      />
    </div>
  );
}
