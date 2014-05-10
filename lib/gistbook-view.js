this["gistbookTemplates"] = this["gistbookTemplates"] || {};

this["gistbookTemplates"]["editWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul>\n  <li><a href=\'#\' class=\'gistblock-code active-tab\'>' +
((__t = ( sourceTabText )) == null ? '' : __t) +
'</a></li>\n  <li><a href=\'#\' class=\'gistblock-preview\'>Preview</a></li>\n</ul>\n<div class=\'gistblock-content\'></div>\n<div class=\'button-container\'>\n  <button class=\'gistblock-cancel\'>Cancel</button>\n  <button class=\'gistblock-update blue\'>Update</button>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["gistbookView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-header\'>\n  <h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n</div>\n<ul class=\'gistbook-container\'>\n</ul>\n';

}
return __p
};

this["gistbookTemplates"]["menuWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href=\'#\' class=\'gistblock-move\'><i class=\'fa fa-bars\'></i></a>\n<a href=\'#\' class=\'gistblock-edit\'><i class=\'fa fa-pencil\'></i></a>\n<a href=\'#\' class=\'gistblock-delete\'><i class=\'fa fa-trash-o\'></i></a>\n<div class=\'gistblock-content\'></div>\n';

}
return __p
};

this["gistbookTemplates"]["processedEditView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-row-controls\'>\n  <hr>\n  <ul>\n    <li>\n      <a href=\'#\' class=\'add-text\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-font fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n    <li>\n      <a href=\'#\' class=\'add-javascript\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-code fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n  </ul>\n</div>\n<div class=\'gistblock-wrapper\'>\n</div>\n';

}
return __p
};

(function() {

  var radio = Backbone.Wreqr.radio;


  /*
   * HTML5 Sortable jQuery Plugin
   * http://farhadi.ir/projects/html5sortable
   * 
   * Copyright 2012, Ali Farhadi
   * Released under the MIT license.
   */
  (function($) {
  var dragging, placeholders = $();
  $.fn.sortable = function(options) {
  	var method = String(options);
  	options = $.extend({
  		connectWith: false
  	}, options);
  	return this.each(function() {
  		if (/^enable|disable|destroy$/.test(method)) {
  			var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
  			if (method == 'destroy') {
  				items.add(this).removeData('connectWith items')
  					.off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
  			}
  			return;
  		}
  		var isHandle, index, items = $(this).children(options.items);
  		var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
  		items.find(options.handle).mousedown(function() {
  			isHandle = true;
  		}).mouseup(function() {
  			isHandle = false;
  		});
  		$(this).data('items', options.items)
  		placeholders = placeholders.add(placeholder);
  		if (options.connectWith) {
  			$(options.connectWith).add(this).data('connectWith', options.connectWith);
  		}
  		items.attr('draggable', 'true').on('dragstart.h5s', function(e) {
  			if (options.handle && !isHandle) {
  				return false;
  			}
  			isHandle = false;
  			var dt = e.originalEvent.dataTransfer;
  			dt.effectAllowed = 'move';
  			dt.setData('Text', 'dummy');
  			index = (dragging = $(this)).addClass('sortable-dragging').index();
  		}).on('dragend.h5s', function() {
  			if (!dragging) {
  				return;
  			}
  			dragging.removeClass('sortable-dragging').show();
  			placeholders.detach();
  			if (index != dragging.index()) {
  				dragging.parent().trigger('sortupdate', {item: dragging});
  			}
  			dragging = null;
  		}).not('a[href], img').on('selectstart.h5s', function() {
  			this.dragDrop && this.dragDrop();
  			return false;
  		}).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
  			if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
  				return true;
  			}
  			if (e.type == 'drop') {
  				e.stopPropagation();
  				placeholders.filter(':visible').after(dragging);
  				dragging.trigger('dragend.h5s');
  				return false;
  			}
  			e.preventDefault();
  			e.originalEvent.dataTransfer.dropEffect = 'move';
  			if (items.is(this)) {
  				if (options.forcePlaceholderSize) {
  					placeholder.height(dragging.outerHeight());
  				}
  				dragging.hide();
  				$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
  				placeholders.not(placeholder).detach();
  			} else if (!placeholders.is(this) && !$(this).children(options.items).length) {
  				placeholders.detach();
  				$(this).append(placeholder);
  			}
  			return false;
  		});
  	});
  };
  })(jQuery);
  
  /**
   * marked - a markdown parser
   * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/chjj/marked
   */
  
  ;(function() {
  
  /**
   * Block-Level Grammar
   */
  
  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: noop,
    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
    nptable: noop,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
    table: noop,
    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
    text: /^[^\n]+/
  };
  
  block.bullet = /(?:[*+-]|\d+\.)/;
  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
  block.item = replace(block.item, 'gm')
    (/bull/g, block.bullet)
    ();
  
  block.list = replace(block.list)
    (/bull/g, block.bullet)
    ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
    ('def', '\\n+(?=' + block.def.source + ')')
    ();
  
  block.blockquote = replace(block.blockquote)
    ('def', block.def)
    ();
  
  block._tag = '(?!(?:'
    + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
    + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
    + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
  
  block.html = replace(block.html)
    ('comment', /<!--[\s\S]*?-->/)
    ('closed', /<(tag)[\s\S]+?<\/\1>/)
    ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
    (/tag/g, block._tag)
    ();
  
  block.paragraph = replace(block.paragraph)
    ('hr', block.hr)
    ('heading', block.heading)
    ('lheading', block.lheading)
    ('blockquote', block.blockquote)
    ('tag', '<' + block._tag)
    ('def', block.def)
    ();
  
  /**
   * Normal Block Grammar
   */
  
  block.normal = merge({}, block);
  
  /**
   * GFM Block Grammar
   */
  
  block.gfm = merge({}, block.normal, {
    fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
    paragraph: /^/
  });
  
  block.gfm.paragraph = replace(block.paragraph)
    ('(?!', '(?!'
      + block.gfm.fences.source.replace('\\1', '\\2') + '|'
      + block.list.source.replace('\\1', '\\3') + '|')
    ();
  
  /**
   * GFM + Tables Block Grammar
   */
  
  block.tables = merge({}, block.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
  });
  
  /**
   * Block Lexer
   */
  
  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = {};
    this.options = options || marked.defaults;
    this.rules = block.normal;
  
    if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }
  
  /**
   * Expose Block Rules
   */
  
  Lexer.rules = block;
  
  /**
   * Static Lex Method
   */
  
  Lexer.lex = function(src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };
  
  /**
   * Preprocessing
   */
  
  Lexer.prototype.lex = function(src) {
    src = src
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, '    ')
      .replace(/\u00a0/g, ' ')
      .replace(/\u2424/g, '\n');
  
    return this.token(src, true);
  };
  
  /**
   * Lexing
   */
  
  Lexer.prototype.token = function(src, top, bq) {
    var src = src.replace(/^ +$/gm, '')
      , next
      , loose
      , cap
      , bull
      , b
      , item
      , space
      , i
      , l;
  
    while (src) {
      // newline
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: 'space'
          });
        }
      }
  
      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          text: !this.options.pedantic
            ? cap.replace(/\n+$/, '')
            : cap
        });
        continue;
      }
  
      // fences (gfm)
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'code',
          lang: cap[2],
          text: cap[3]
        });
        continue;
      }
  
      // heading
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }
  
      // table no leading pipe (gfm)
      if (top && (cap = this.rules.nptable.exec(src))) {
        src = src.substring(cap[0].length);
  
        item = {
          type: 'table',
          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3].replace(/\n$/, '').split('\n')
        };
  
        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }
  
        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i].split(/ *\| */);
        }
  
        this.tokens.push(item);
  
        continue;
      }
  
      // lheading
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[2] === '=' ? 1 : 2,
          text: cap[1]
        });
        continue;
      }
  
      // hr
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'hr'
        });
        continue;
      }
  
      // blockquote
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);
  
        this.tokens.push({
          type: 'blockquote_start'
        });
  
        cap = cap[0].replace(/^ *> ?/gm, '');
  
        // Pass `top` to keep the current
        // "toplevel" state. This is exactly
        // how markdown.pl works.
        this.token(cap, top, true);
  
        this.tokens.push({
          type: 'blockquote_end'
        });
  
        continue;
      }
  
      // list
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
  
        this.tokens.push({
          type: 'list_start',
          ordered: bull.length > 1
        });
  
        // Get each top-level item.
        cap = cap[0].match(this.rules.item);
  
        next = false;
        l = cap.length;
        i = 0;
  
        for (; i < l; i++) {
          item = cap[i];
  
          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) +/, '');
  
          // Outdent whatever the
          // list item contains. Hacky.
          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic
              ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
              : item.replace(/^ {1,4}/gm, '');
          }
  
          // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.
          if (this.options.smartLists && i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
              src = cap.slice(i + 1).join('\n') + src;
              i = l - 1;
            }
          }
  
          // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }
  
          this.tokens.push({
            type: loose
              ? 'loose_item_start'
              : 'list_item_start'
          });
  
          // Recurse.
          this.token(item, false, bq);
  
          this.tokens.push({
            type: 'list_item_end'
          });
        }
  
        this.tokens.push({
          type: 'list_end'
        });
  
        continue;
      }
  
      // html
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize
            ? 'paragraph'
            : 'html',
          pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
          text: cap[0]
        });
        continue;
      }
  
      // def
      if ((!bq && top) && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.links[cap[1].toLowerCase()] = {
          href: cap[2],
          title: cap[3]
        };
        continue;
      }
  
      // table (gfm)
      if (top && (cap = this.rules.table.exec(src))) {
        src = src.substring(cap[0].length);
  
        item = {
          type: 'table',
          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
        };
  
        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }
  
        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i]
            .replace(/^ *\| *| *\| *$/g, '')
            .split(/ *\| */);
        }
  
        this.tokens.push(item);
  
        continue;
      }
  
      // top-level paragraph
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'paragraph',
          text: cap[1].charAt(cap[1].length - 1) === '\n'
            ? cap[1].slice(0, -1)
            : cap[1]
        });
        continue;
      }
  
      // text
      if (cap = this.rules.text.exec(src)) {
        // Top-level should never reach here.
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'text',
          text: cap[0]
        });
        continue;
      }
  
      if (src) {
        throw new
          Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }
  
    return this.tokens;
  };
  
  /**
   * Inline-Level Grammar
   */
  
  var inline = {
    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
    autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
    url: noop,
    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
    link: /^!?\[(inside)\]\(href\)/,
    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
    em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
    code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
    br: /^ {2,}\n(?!\s*$)/,
    del: noop,
    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
  };
  
  inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
  inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
  
  inline.link = replace(inline.link)
    ('inside', inline._inside)
    ('href', inline._href)
    ();
  
  inline.reflink = replace(inline.reflink)
    ('inside', inline._inside)
    ();
  
  /**
   * Normal Inline Grammar
   */
  
  inline.normal = merge({}, inline);
  
  /**
   * Pedantic Inline Grammar
   */
  
  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
  });
  
  /**
   * GFM Inline Grammar
   */
  
  inline.gfm = merge({}, inline.normal, {
    escape: replace(inline.escape)('])', '~|])')(),
    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: replace(inline.text)
      (']|', '~]|')
      ('|', '|https?://|')
      ()
  });
  
  /**
   * GFM + Line Breaks Inline Grammar
   */
  
  inline.breaks = merge({}, inline.gfm, {
    br: replace(inline.br)('{2,}', '*')(),
    text: replace(inline.gfm.text)('{2,}', '*')()
  });
  
  /**
   * Inline Lexer & Compiler
   */
  
  function InlineLexer(links, options) {
    this.options = options || marked.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer;
    this.renderer.options = this.options;
  
    if (!this.links) {
      throw new
        Error('Tokens array requires a `links` property.');
    }
  
    if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    } else if (this.options.pedantic) {
      this.rules = inline.pedantic;
    }
  }
  
  /**
   * Expose Inline Rules
   */
  
  InlineLexer.rules = inline;
  
  /**
   * Static Lexing/Compiling Method
   */
  
  InlineLexer.output = function(src, links, options) {
    var inline = new InlineLexer(links, options);
    return inline.output(src);
  };
  
  /**
   * Lexing/Compiling
   */
  
  InlineLexer.prototype.output = function(src) {
    var out = ''
      , link
      , text
      , href
      , cap;
  
    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += cap[1];
        continue;
      }
  
      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = cap[1].charAt(6) === ':'
            ? this.mangle(cap[1].substring(7))
            : this.mangle(cap[1]);
          href = this.mangle('mailto:') + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }
  
      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        src = src.substring(cap[0].length);
        text = escape(cap[1]);
        href = text;
        out += this.renderer.link(href, null, text);
        continue;
      }
  
      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize
          ? escape(cap[0])
          : cap[0];
        continue;
      }
  
      // link
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length);
        this.inLink = true;
        out += this.outputLink(cap, {
          href: cap[2],
          title: cap[3]
        });
        this.inLink = false;
        continue;
      }
  
      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src))
          || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }
  
      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[2] || cap[1]));
        continue;
      }
  
      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[2] || cap[1]));
        continue;
      }
  
      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2], true));
        continue;
      }
  
      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }
  
      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }
  
      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape(this.smartypants(cap[0]));
        continue;
      }
  
      if (src) {
        throw new
          Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }
  
    return out;
  };
  
  /**
   * Compile Link
   */
  
  InlineLexer.prototype.outputLink = function(cap, link) {
    var href = escape(link.href)
      , title = link.title ? escape(link.title) : null;
  
    return cap[0].charAt(0) !== '!'
      ? this.renderer.link(href, title, this.output(cap[1]))
      : this.renderer.image(href, title, escape(cap[1]));
  };
  
  /**
   * Smartypants Transformations
   */
  
  InlineLexer.prototype.smartypants = function(text) {
    if (!this.options.smartypants) return text;
    return text
      // em-dashes
      .replace(/--/g, '\u2014')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
      // closing doubles
      .replace(/"/g, '\u201d')
      // ellipses
      .replace(/\.{3}/g, '\u2026');
  };
  
  /**
   * Mangle Links
   */
  
  InlineLexer.prototype.mangle = function(text) {
    var out = ''
      , l = text.length
      , i = 0
      , ch;
  
    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }
  
    return out;
  };
  
  /**
   * Renderer
   */
  
  function Renderer(options) {
    this.options = options || {};
  }
  
  Renderer.prototype.code = function(code, lang, escaped) {
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
  
    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code, true))
        + '\n</code></pre>';
    }
  
    return '<pre><code class="'
      + this.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>\n';
  };
  
  Renderer.prototype.blockquote = function(quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  };
  
  Renderer.prototype.html = function(html) {
    return html;
  };
  
  Renderer.prototype.heading = function(text, level, raw) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + raw.toLowerCase().replace(/[^\w]+/g, '-')
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  };
  
  Renderer.prototype.hr = function() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  };
  
  Renderer.prototype.list = function(body, ordered) {
    var type = ordered ? 'ol' : 'ul';
    return '<' + type + '>\n' + body + '</' + type + '>\n';
  };
  
  Renderer.prototype.listitem = function(text) {
    return '<li>' + text + '</li>\n';
  };
  
  Renderer.prototype.paragraph = function(text) {
    return '<p>' + text + '</p>\n';
  };
  
  Renderer.prototype.table = function(header, body) {
    return '<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + '<tbody>\n'
      + body
      + '</tbody>\n'
      + '</table>\n';
  };
  
  Renderer.prototype.tablerow = function(content) {
    return '<tr>\n' + content + '</tr>\n';
  };
  
  Renderer.prototype.tablecell = function(content, flags) {
    var type = flags.header ? 'th' : 'td';
    var tag = flags.align
      ? '<' + type + ' style="text-align:' + flags.align + '">'
      : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  };
  
  // span level renderer
  Renderer.prototype.strong = function(text) {
    return '<strong>' + text + '</strong>';
  };
  
  Renderer.prototype.em = function(text) {
    return '<em>' + text + '</em>';
  };
  
  Renderer.prototype.codespan = function(text) {
    return '<code>' + text + '</code>';
  };
  
  Renderer.prototype.br = function() {
    return this.options.xhtml ? '<br/>' : '<br>';
  };
  
  Renderer.prototype.del = function(text) {
    return '<del>' + text + '</del>';
  };
  
  Renderer.prototype.link = function(href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (e) {
        return '';
      }
      if (prot.indexOf('javascript:') === 0) {
        return '';
      }
    }
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };
  
  Renderer.prototype.image = function(href, title, text) {
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  };
  
  /**
   * Parsing & Compiling
   */
  
  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked.defaults;
    this.options.renderer = this.options.renderer || new Renderer;
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
  }
  
  /**
   * Static Parse Method
   */
  
  Parser.parse = function(src, options, renderer) {
    var parser = new Parser(options, renderer);
    return parser.parse(src);
  };
  
  /**
   * Parse Loop
   */
  
  Parser.prototype.parse = function(src) {
    this.inline = new InlineLexer(src.links, this.options, this.renderer);
    this.tokens = src.reverse();
  
    var out = '';
    while (this.next()) {
      out += this.tok();
    }
  
    return out;
  };
  
  /**
   * Next Token
   */
  
  Parser.prototype.next = function() {
    return this.token = this.tokens.pop();
  };
  
  /**
   * Preview Next Token
   */
  
  Parser.prototype.peek = function() {
    return this.tokens[this.tokens.length - 1] || 0;
  };
  
  /**
   * Parse Text Tokens
   */
  
  Parser.prototype.parseText = function() {
    var body = this.token.text;
  
    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }
  
    return this.inline.output(body);
  };
  
  /**
   * Parse Current Token
   */
  
  Parser.prototype.tok = function() {
    switch (this.token.type) {
      case 'space': {
        return '';
      }
      case 'hr': {
        return this.renderer.hr();
      }
      case 'heading': {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          this.token.text);
      }
      case 'code': {
        return this.renderer.code(this.token.text,
          this.token.lang,
          this.token.escaped);
      }
      case 'table': {
        var header = ''
          , body = ''
          , i
          , row
          , cell
          , flags
          , j;
  
        // header
        cell = '';
        for (i = 0; i < this.token.header.length; i++) {
          flags = { header: true, align: this.token.align[i] };
          cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            { header: true, align: this.token.align[i] }
          );
        }
        header += this.renderer.tablerow(cell);
  
        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];
  
          cell = '';
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(
              this.inline.output(row[j]),
              { header: false, align: this.token.align[j] }
            );
          }
  
          body += this.renderer.tablerow(cell);
        }
        return this.renderer.table(header, body);
      }
      case 'blockquote_start': {
        var body = '';
  
        while (this.next().type !== 'blockquote_end') {
          body += this.tok();
        }
  
        return this.renderer.blockquote(body);
      }
      case 'list_start': {
        var body = ''
          , ordered = this.token.ordered;
  
        while (this.next().type !== 'list_end') {
          body += this.tok();
        }
  
        return this.renderer.list(body, ordered);
      }
      case 'list_item_start': {
        var body = '';
  
        while (this.next().type !== 'list_item_end') {
          body += this.token.type === 'text'
            ? this.parseText()
            : this.tok();
        }
  
        return this.renderer.listitem(body);
      }
      case 'loose_item_start': {
        var body = '';
  
        while (this.next().type !== 'list_item_end') {
          body += this.tok();
        }
  
        return this.renderer.listitem(body);
      }
      case 'html': {
        var html = !this.token.pre && !this.options.pedantic
          ? this.inline.output(this.token.text)
          : this.token.text;
        return this.renderer.html(html);
      }
      case 'paragraph': {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case 'text': {
        return this.renderer.paragraph(this.parseText());
      }
    }
  };
  
  /**
   * Helpers
   */
  
  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  function unescape(html) {
    return html.replace(/&([#\w]+);/g, function(_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x'
          ? String.fromCharCode(parseInt(n.substring(2), 16))
          : String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }
  
  function replace(regex, opt) {
    regex = regex.source;
    opt = opt || '';
    return function self(name, val) {
      if (!name) return new RegExp(regex, opt);
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return self;
    };
  }
  
  function noop() {}
  noop.exec = noop;
  
  function merge(obj) {
    var i = 1
      , target
      , key;
  
    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
  
    return obj;
  }
  
  
  /**
   * Marked
   */
  
  function marked(src, opt, callback) {
    if (callback || typeof opt === 'function') {
      if (!callback) {
        callback = opt;
        opt = null;
      }
  
      opt = merge({}, marked.defaults, opt || {});
  
      var highlight = opt.highlight
        , tokens
        , pending
        , i = 0;
  
      try {
        tokens = Lexer.lex(src, opt)
      } catch (e) {
        return callback(e);
      }
  
      pending = tokens.length;
  
      var done = function() {
        var out, err;
  
        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
  
        opt.highlight = highlight;
  
        return err
          ? callback(err)
          : callback(null, out);
      };
  
      if (!highlight || highlight.length < 3) {
        return done();
      }
  
      delete opt.highlight;
  
      if (!pending) return done();
  
      for (; i < tokens.length; i++) {
        (function(token) {
          if (token.type !== 'code') {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function(err, code) {
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }
  
      return;
    }
    try {
      if (opt) opt = merge({}, marked.defaults, opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/chjj/marked.';
      if ((opt || marked.defaults).silent) {
        return '<p>An error occured:</p><pre>'
          + escape(e.message + '', true)
          + '</pre>';
      }
      throw e;
    }
  }
  
  /**
   * Options
   */
  
  marked.options =
  marked.setOptions = function(opt) {
    merge(marked.defaults, opt);
    return marked;
  };
  
  marked.defaults = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    silent: false,
    highlight: null,
    langPrefix: 'lang-',
    smartypants: false,
    headerPrefix: '',
    renderer: new Renderer,
    xhtml: false
  };
  
  /**
   * Expose
   */
  
  marked.Parser = Parser;
  marked.parser = Parser.parse;
  
  marked.Renderer = Renderer;
  
  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;
  
  marked.InlineLexer = InlineLexer;
  marked.inlineLexer = InlineLexer.output;
  
  marked.parse = marked;
  
  if (typeof exports === 'object') {
    module.exports = marked;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return marked; });
  } else {
    this.marked = marked;
  }
  
  }).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
  }());
  

  /*
   * ace-editor-view
   * ---------------
   * A view for the ace editor. Used for both
   * inert and active views
   *
   */
  
  var AceEditorView = Marionette.ItemView.extend({
    template: _.template('<div class="ace-wrapper"><div class="ace-editor"><%= source %></div></div>'),
  
    // Defaults for the view
    defaults: {
      readOnly: false,
      tabSize: 2,
      softTabs: true,
      highlightActiveLine: false,
      theme: 'tomorrow',
      mode: 'javascript',
      minLines: 8,
      maxLines: 20,
      hideCursor: false,
      showGutter: false
    },
  
    ui: {
      aceContainer: '.ace-editor'
    },
  
    // Merge the options
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
    },
  
    // Where ace stores its themes
    _getThemePath: function(themeName) {
      return 'ace/theme/'+themeName;
    },
  
    // Where ace stores modes
    _getModePath: function(modeName) {
      return 'ace/mode/'+modeName;
    },
  
    // Configure the editor based on our options
    _configureEditor: function() {
      var themePath = this._getThemePath(this.theme);
      var modePath  = this._getModePath(this.mode);
  
      var session = this.editor.getSession();
      var renderer = this.editor.renderer;
  
      this.editor.setHighlightActiveLine(this.highlightActiveLine);
      this.editor.getSession().setMode(modePath);
      this.editor.setTheme(themePath);
      this.editor.setOption("maxLines", this.maxLines);
      this.editor.setOption("minLines", this.minLines);
  
      this.editor.setReadOnly(this.readOnly);
      session.setTabSize(this.tabSize);
      session.setUseSoftTabs(this.softTabs);
      renderer.setShowGutter(this.showGutter);
  
      if (this.hideCursor) {
        renderer.$cursorLayer.element.style.opacity = 0;
      }
    },
  
    // Create the editor and configure it
    onRender: function() {
      this.editor = ace.edit(this.ui.aceContainer[0]);
      this._configureEditor();
    },
  
    // Clean up the editor before we close down!
    onBeforeClose: function() {
      this.editor.destroy();
    }
  });
  
  /*
   * inert-text-view
   * ---------------
   * Displays text, first formatted with Markdown, and then Latex.
   *
   */
  
  var InertTextView = Marionette.ItemView.extend({
    template: _.template(''),
  
    className: 'gistblock gistblock-text',
  
    // After render begin processing the markdown
    onRender: function() {
  
      var markdown = this.model.get('source');
      var $el = this.$el;
  
      if (markdown) {
        marked(markdown, function(err, content) {
          $el.html(content);
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,$el[0]]);
        });
      }
    }
  });
  
  /*
   * menu-wrapper
   * ------------
   * A wrapper for an Inert View;
   * It provides controls for editing
   *
   *
   */
  
  var MenuWrapper = Marionette.Layout.extend({
    template: gistbookTemplates.menuWrapper,
  
    className: 'gistblock-menu',
  
    // Default values for options
    defaults: {
      InertView: undefined,
      editOptions: {
        edit: true,
        delete: true,
        move: true
      }
    },
  
    // Where to put the InertView, and the 3 menu options
    ui: {
      content: '.gistblock-content',
      edit: '.gistblock-edit',
      move: '.gistblock-move',
      delete: '.gistblock-delete'
    },
  
    // Respond to clicks; the parent view is listening
    triggers: {
      'click @ui.edit': 'edit',
      'click @ui.move': 'move',
      'click @ui.delete': 'delete'
    },
  
    // Store our options on the object itself
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
    },
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
    },
  
    // Show the inert view after rendering
    onRender: function() {
      this._showMenu();
      var region = this.getRegion('content');
      region.show(new this.InertView({
        model: this.model
      }));
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  
  /*
   * edit-wrapper
   * ------------
   * A wrapper for an editable Ace Editor View;
   * It provides the controls to toggle between source/preview,
   * and the buttons to cancel/save the changes
   *
   */
  
  var EditWrapper = Marionette.Layout.extend({
    template: gistbookTemplates.editWrapper,
  
    className: 'gistblock-editor',
  
    tagName: 'li',
  
    // Default values for options
    defaults: {
      // What the tab says that shows the source
      sourceTabText: 'Code',
      PreviewView: undefined,
      // Options to pass along to the ace editor
      aceEditorOptions: {},
      parent: undefined
    },
  
    serializeData: function() {
      var data = Marionette.ItemView.prototype.serializeData.call(this);
      data.sourceTabText = this.sourceTabText;
      return data;
    },
  
    // Where to put the InertView, and the 3 menu options
    ui: {
      content: '.gistblock-content',
      code:    '.gistblock-code',
      preview: '.gistblock-preview',
      cancel:  '.gistblock-cancel',
      update:  '.gistblock-update'
    },
  
    // Respond to clicks; the parent view is listening
    triggers: {
      'click @ui.code':    'code',
      'click @ui.preview': 'preview',
      'click @ui.cancel':  'cancel',
      'click @ui.update':  'update'
    },
  
    // On preview, update the cache with the changes in the Ace Editor
    // Then, show the preview state
    onPreview: function() {
      if (this.mode === 'preview') {
        return;
      }
      this.mode = 'preview';
      this.transitionUiToPreview();
      this.parent._updateCache();
      this.showPreview();
    },
  
    onCode: function() {
      if (this.mode === 'code') {
        return;
      }
      this.mode = 'code';
      this.transitionUiToCode();
      this.showEditor();
    },
  
    transitionUiToPreview: function() {
      this.ui.code.removeClass('active-tab');
      this.ui.preview.addClass('active-tab');
    },
  
    transitionUiToCode: function() {
      this.ui.preview.removeClass('active-tab');
      this.ui.code.addClass('active-tab');
    },
  
    getAceEditorView: function() {
      var aceOptions = _.extend(this.aceEditorOptions, {model: this.model});
      return new AceEditorView(aceOptions);
    },
  
    // Show the Ace Editor in our region
    showEditor: function() {
      var aceEditorView = this.getAceEditorView();
      var region = this.getRegion('content');
      region.show(aceEditorView);
      this.editor = region.currentView.editor;
    },
  
    // The preview is just an inert math view
    showPreview: function() {
      this.editor.destroy();
      var region = this.getRegion('content');
      delete this.editor;
      region.show(new this.PreviewView({
        model: this.model
      }));
    },
  
    // Store our options on the object itself.
    // Also set the initial mode to be code.
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      this.mode = 'code';
    },
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
    },
  
    // Show the editor view on the first render
    onRender: function() {
      this._showMenu();
  
      this.showEditor();
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  
  /*
   * processed-edit-view
   * --------------
   * Some views are processed before they're rendered, like
   * MathJax and Markdown.
   * This is the edit view you should use for those things.
   *
   */
  
  var ProcessedEditView = Marionette.Layout.extend({
    template: gistbookTemplates.processedEditView,
  
    className: 'processed-edit-view',
  
    tagName: 'li',
  
    defaults: {
      InertView: undefined
    },
  
    // Sets our options, binds callback context, and creates
    // a cached model for users to mess around with
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      _.bindAll(this,
        'onEdit', 'onMove', 'onDelete',
        'onCancel', 'onUpdate'
      );
  
      this._createCache();
    },
  
    // Store a cached model on the view. The user can manipulate
    // this all they want. If they save the block we will persist
    // it to the model
    _createCache: function() {
      this.cachedModel = new Backbone.Model(
        this.model.toJSON()
      );
    },
  
    // Call this when the user hits update and wants to save
    // their changes to the model
    _saveCache: function() {
      this.model.set(
        this.cachedModel.toJSON()
      );
    },
  
    // If the user changes the cache and wants to reset it,
    // call this
    _resetCache: function() {
      this.cachedModel.set(
        this.model.toJSON()
      );
    },
  
    // Update the cache with the latest content of the Ace Editor
    _updateCache: function() {
      this.cachedModel.set('source', this._getEditorValue());
    },
  
    // Get the value from the ace editor. Very deeply nested. Yikes.
    _getEditorValue: function() {
      return this.getRegion('wrapper').currentView.editor.getValue();
    },
  
    regions: {
      wrapper: '.gistblock-wrapper'
    },
  
    onEdit: function() {
      // console.log('The parent has been told to edit');
      // Remove handlers; the child is about to be destroyed
      this.showEdit();
    },
  
    showPreview: function() {
      this.stopListening();
      this.getRegion('wrapper').show(
        new MenuWrapper({
          InertView: this.InertView,
          model: this.cachedModel
        })
      );
      this.currentView = this.getRegion('wrapper').currentView;
      this._configurePreviewListeners();
    },
  
    showEdit: function() {
      this.stopListening();
      var region = this.getRegion('wrapper');
      region.show(
        new EditWrapper({
          PreviewView: this.InertView,
          model: this.cachedModel,
          aceEditorOptions: {
            minLines: 4
          },
          parent: this
        })
      );
      this.currentView = region.currentView;
      this._configureEditListeners();
    },
  
    onMove: function() {
      console.log('The parent has been told to move');
    },
  
    onDelete: function() {
      this.model.collection.remove(this.model);
    },
  
    // When the user cancels editing, first reset the cache to match
    // the saved state. Then, show the preview
    onCancel: function() {
      this._resetCache();
      this.showPreview();
    },
  
    // When the user updates, first update the cache with the value
    // from the AceEditor. Then persist those changes to the actual model.
    // Finally, take them to the preview view.
    onUpdate: function() {
      this._updateCache();
      this._saveCache();
      this.showPreview();
    },
  
    // Show the edit view with the InertView as the display
    onRender: function() {
      this.showPreview();
    },
  
    _configureEditListeners: function() {
      this.listenTo(this.currentView, 'cancel', this.onCancel);
      this.listenTo(this.currentView, 'update', this.onUpdate);
    },
  
    _configurePreviewListeners: function() {
      this.listenTo(this.currentView, 'edit', this.onEdit);
      this.listenTo(this.currentView, 'delete', this.onDelete);
      this.listenTo(this.currentView, 'move', this.onMove);
    }
  });
  

  var GistbookView = Marionette.CompositeView.extend({
  
    // Create our collection from the gistbook's blocks
    initialize: function(options) {
      var gistblocks = options.model.get('blocks');
      this.collection = new Backbone.Collection(gistblocks);
      this.authorized = radio.reqres.request('global', 'authorized');
    },
  
    template: gistbookTemplates.gistbookView,
  
    ui: {
      container: '.gistbook-container'
    },
  
    itemViewContainer: '.gistbook-container',
  
    // Never used; just here to prevent errors
    itemView: Marionette.ItemView.extend({
      template: _.template('<div>hi</div>')
    }),
  
    className: 'gistbook',
  
    // Determine the view based on the authorization
    // and model info
    getItemView: function(model) {;
      var viewType = model.get('type');
      return this['_'+viewType+'View']();
    },
  
    _textView: function() {
      if (this.authorized) {
        this.itemViewOptions = {
          InertView: InertTextView
        };
        return ProcessedEditView;
      }
  
      else {
        this.itemViewOptions = {};
        return InertTextView.extend({
          tagName: 'li'
        });
      }
  
    },
  
    // Make it sortable if we're authorized
    onRender: function() {
      if (this.authorized) {
        this.ui.container.sortable({
          handle: '.gistblock-move'
        });
      }
    },
  
    _javascriptView: function() {
      if (this.authorized) {
        this.itemViewOptions = {
          className: 'gistblock gistblock-javascript'
        };
        return AceEditorView.extend({
          tagName: 'li'
        });
      }
  
      else {
        this.itemViewOptions = {
          readOnly: true,
          hideCursor: true,
          className: 'gistblock gistblock-javascript'
        };
        return AceEditorView.extend({
          tagName: 'li'
        });
      }
    },
  
    onBeforeClose: function() {
      // Shut down sortable
      this.ui.container.sortable('destroy');
    }
  });
  

  window.GistbookView = GistbookView;

})();
