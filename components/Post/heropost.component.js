import { DateFormatter } from '../Date';
import { CoverImage } from './coverimage.component';
import Link from 'next/link';
import { AvatarWithNameComponent } from './avatar.component';

export const HeroPost = function ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {/* {coverImage && (
          <CoverImage
            title={title}
            src={coverImage}
            slug={slug}
            height={620}
            width={1240}
          />
        )} */}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-xl bold lg:text-2xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <AvatarWithNameComponent author={author} />
        </div>
      </div>
    </section>
  );
};
