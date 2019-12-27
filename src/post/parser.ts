import * as SELECTOR from './selectors';
import { getText, toInt, regexExtract, isEmpty, getRootText, isDefined, isUndefined } from '../parse.utils';
import { IPost } from '.';
import { IContent, ITagged, ITag, IStdTaging } from '../schema.base';

// SELECTOR
export const getPages = ($: CheerioStatic): IContent[] =>
  [{
    conetntURL: [
      ...$(SELECTOR.VIDEO).map((e, el) => $(el).attr('src')).get(),
      $(SELECTOR.ORIGINAL).attr('href'),
      $(SELECTOR.HIGH_RES).attr('href'),
      $(SELECTOR.HIGH_RES_SHOW).attr('href'),
      $(SELECTOR.PREVIEW).attr('src'),
    ].filter((url) => !isEmpty(url))
  }]


export const getTags = ($: CheerioStatic): ITagged => {
  const info: { [key: string]: ITag[] } = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((i, elRaw) => {
      const el = $(elRaw);

      const name = ((): string => {
        const clazz = el.attr('class') as string;
        if (isEmpty(clazz)) { throw new Error('Failed to get classes'); }

        let names = clazz.split(' ')
          .map((v) => regexExtract(v, /tag-type-(\w+)/i))
          .filter((v) => !isEmpty(v))
        if (!names[0]) { throw new Error('Tag type not found'); }
        return names[0];
      })();

      const values = el.find(SELECTOR.CONTAINER_TAG)
        .map((i2, tag) => ({
          name: getRootText($(tag)),
          href: $(tag).attr('href'),
        } as ITag)).get();

      info[name] = [...(info[name] || []), ...values];
    });

  return {
    characters: info.character || [],
    tags: info.general || [],
    artists: info.artist || [],
    copyrights: info.copyright || [],
    metadata: info.metadata || [],

  };
};

export default ($: CheerioStatic, id: number): IPost => {
  const content = getPages($);
  if (!content.length) { throw new Error('There is no content'); }

  return {
    id,

    tags: getTags($),
    content,
  };
};
