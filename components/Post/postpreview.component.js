// import Avatar from '../components/avatar'
import { DateFormatter } from '../Date';
import { CoverImage } from './coverimage.component';
import Link from 'next/link';
import { AvatarWithNameComponent } from './avatar.component';

export const PostPreview = function ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        {coverImage && (
          <CoverImage
            slug={slug}
            title={title}
            src={coverImage}
            height={278}
            width={556}
          />
        )}
      </div>
      <h3 className="text-xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text leading-relaxed mb-4">{excerpt}</p>
      <AvatarWithNameComponent author={author} />
    </div>
  );
};
