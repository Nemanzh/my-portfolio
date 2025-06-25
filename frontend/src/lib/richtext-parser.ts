import React from 'react';
import type { JSX } from 'react';

interface RichTextNode {
  type: string;
  format?: string;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  level?: number;
}

export function parseRichTextToElements(
  richText: RichTextNode[] | string,
  className?: string
): React.ReactNode[] {
  if (typeof richText === 'string') {
    return [
      React.createElement(
        'p',
        {
          key: '0',
          className: className || 'text-muted-foreground leading-relaxed',
        },
        richText
      ),
    ];
  }

  if (!Array.isArray(richText)) {
    return [];
  }

  const elements = richText
    .map((node, index) => {
      return parseNode(node, index, className);
    })
    .filter(Boolean) as React.ReactNode[];

  return elements;
}

function parseNode(
  node: RichTextNode,
  index: number,
  className?: string
): React.ReactNode | null {
  switch (node.type) {
    case 'paragraph':
      if (!node.children) return null;

      const paragraphContent = node.children.map((child, childIndex) =>
        parseInlineNode(child, `${index}-${childIndex}`)
      );

      if (paragraphContent.every((content) => !content)) return null;

      return React.createElement(
        'p',
        {
          key: index,
          className: className || 'text-muted-foreground leading-relaxed mb-2',
        },
        paragraphContent
      );

    case 'heading':
      if (!node.children) return null;

      const headingContent = node.children.map((child, childIndex) =>
        parseInlineNode(child, `${index}-${childIndex}`)
      );

      const HeadingTag = `h${Math.min(
        node.level || 3,
        6
      )}` as keyof JSX.IntrinsicElements;

      return React.createElement(
        HeadingTag,
        {
          key: index,
          className: 'font-semibold mb-2 text-foreground',
        },
        headingContent
      );

    case 'list':
      if (!node.children) return null;

      const listItems = node.children
        .map((item, itemIndex) => {
          if (item.type === 'list-item' && item.children) {
            const itemContent = item.children
              .map((child, childIndex) => {
                if (child.type === 'paragraph' && child.children) {
                  return child.children.map((grandChild, grandChildIndex) =>
                    parseInlineNode(
                      grandChild,
                      `${index}-${itemIndex}-${childIndex}-${grandChildIndex}`
                    )
                  );
                }
                return parseInlineNode(
                  child,
                  `${index}-${itemIndex}-${childIndex}`
                );
              })
              .flat();

            return React.createElement(
              'li',
              {
                key: itemIndex,
                className: 'mb-1 text-muted-foreground leading-relaxed',
              },
              itemContent
            );
          }
          return null;
        })
        .filter(Boolean);

      return React.createElement(
        'ul',
        {
          key: index,
          className: 'list-disc list-inside space-y-1 mb-3',
        },
        listItems
      );

    // Handle different list types
    case 'unordered-list':
    case 'bulleted-list':
      return parseNode({ ...node, type: 'list' }, index, className);

    case 'ordered-list':
    case 'numbered-list':
      if (!node.children) return null;

      const orderedListItems = node.children
        .map((item, itemIndex) => {
          if (
            (item.type === 'list-item' || item.type === 'list-item-child') &&
            item.children
          ) {
            const itemContent = item.children
              .map((child, childIndex) =>
                parseInlineNode(child, `${index}-${itemIndex}-${childIndex}`)
              )
              .flat();

            return React.createElement(
              'li',
              {
                key: itemIndex,
                className: 'mb-1 text-muted-foreground leading-relaxed',
              },
              itemContent
            );
          }
          return null;
        })
        .filter(Boolean);

      return React.createElement(
        'ol',
        {
          key: index,
          className: 'list-decimal list-inside space-y-1 mb-3',
        },
        orderedListItems
      );

    default:
      return null;
  }
}

function parseInlineNode(node: RichTextNode, key: string): React.ReactNode {
  if (node.type === 'text' && node.text) {
    let element: React.ReactNode = node.text;

    if (node.bold) {
      element = React.createElement('strong', { key: `${key}-bold` }, element);
    }
    if (node.italic) {
      element = React.createElement('em', { key: `${key}-italic` }, element);
    }
    if (node.underline) {
      element = React.createElement('u', { key: `${key}-underline` }, element);
    }
    if (node.code) {
      element = React.createElement(
        'code',
        {
          key: `${key}-code`,
          className: 'bg-muted px-1 py-0.5 rounded text-sm font-mono',
        },
        element
      );
    }

    return element;
  }

  if (node.children) {
    return node.children.map((child, childIndex) =>
      parseInlineNode(child, `${key}-${childIndex}`)
    );
  }

  return node.text || '';
}

export function parseRichTextToString(
  richText: RichTextNode[] | string
): string {
  if (typeof richText === 'string') {
    return richText;
  }

  if (!Array.isArray(richText)) {
    return '';
  }

  return richText
    .map((node) => {
      if (node.type === 'paragraph' && node.children) {
        return node.children
          .map((child) => extractTextFromNode(child))
          .join('')
          .trim();
      }
      if (node.type === 'list' && node.children) {
        return node.children
          .map((item) => {
            if (item.type === 'list-item' && item.children) {
              return (
                '• ' +
                item.children
                  .map((child) => extractTextFromNode(child))
                  .join('')
                  .trim()
              );
            }
            return extractTextFromNode(item);
          })
          .join('\n');
      }
      return extractTextFromNode(node);
    })
    .filter((text) => text.length > 0)
    .join('\n\n');
}

function extractTextFromNode(node: RichTextNode): string {
  if (node.text) {
    return node.text;
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

export function parseAboutContent(aboutData: {
  body?: RichTextNode[] | string;
}): React.ReactNode[] {
  if (!aboutData?.body) return [];

  return parseRichTextToElements(
    aboutData.body,
    'text-lg leading-relaxed mb-4'
  );
}

export function parseExperienceDescription(
  description: RichTextNode[] | string
): string {
  return parseRichTextToString(description);
}
