var ccs2t,cchddt,cf7sgCustomSelect2Templates=ccs2t=cf7sgCustomSelect2Templates||{},cf7sgCustomHybridddTemplates=cchddt=cf7sgCustomHybridddTemplates||{};!function(t){"use strict";var e=[],a=[],i={};t.fn.cf7sgWarning=function(e,a){var i=t(this);if(!i.is(":input"))return i;n(a)&&(a=0);var s=t('<span class="cf7sg-validation-warning">'+e+'<span class="confirm-button">ok</span></span>');i.after(s),a>0&&s.delay(a).fadeOut("slow",function(){i.remove()})},t(document).ready(function(){t("form.wpcf7-form").on("click",".confirm-button",function(e){var a=t(e.target);a.is(".cf7sg-validation-warning .confirm-button")&&a.parent().remove()}).each(function(){var e=t(this),a=e.closest("div.cf7-smart-grid").attr("id");e.attr("id","wpcf7-"+a)});var e=t("div.cf7-smart-grid.has-table form.wpcf7-form");e.length&&(t(".container.cf7-sg-table",e).each(function(){var a=t(this),i=a.closest("div.cf7-smart-grid").attr("id"),s=[],n=t(".row.cf7-sg-table",a),l="Add Row",c=a.next(".container.cf7-sg-table-footer");if(a[0].hasAttribute("id")){var o=t('<input class="cf7sg-tracker-field" value="1" type="hidden">').attr("name",a.attr("id"));a.prepend(o)}switch(!0){case a[0].hasAttribute("data-button"):l=a.data("button");break;case n[0].hasAttribute("data-button"):l=n.data("button")}for(let d in n.find(":input").each(function(){let e=t(this),a=e.attr("name").replace("[]","");!(a.length>0)||(e.addClass("cf7sg-"+a+" cf7sgrow-field"),r(cf7sg[i],["prefill",a])||e.is(".cf7-sg-tabs-panel :input")||(s[a]=cf7sg[i].prefill[a],delete cf7sg[i].prefill[a]))}),c.length>0?(c.detach(),a.after(c),c.after('<div class="cf7-sg-table-button"><a href="javascript:void(0);" class="ui-button">'+l+"</a></div>")):a.after('<div class="cf7-sg-table-button"><a href="javascript:void(0);" class="ui-button">'+l+"</a></div>"),n.attr("data-row","0"),(n=n.clone().addClass("cf7-sg-cloned-table-row")).attr("data-row","-1"),a.append(n.hide()),t(":input",n).each(function(){var e=t(this).prop("disabled",!0),a="_cf7sgcloned_"+e.attr("name");e.attr("name",a)}),n.append('<span class="row-control"><span class="dashicons dashicons-no-alt"></span></span>'),e.on("cf7SmartGridReady",function(t){a.trigger({type:"sgTableReady","table-id":a.attr("id")})}),s){if("[object Object]"!==String(s[d])){cf7sg.debug&&console.log(`ERROR: Prefill table field ${d} value should be array`);return}let f=0,g="";for(let p in s[d])g=f>0?`${d}_row-${f}`:d,a.children(".row.cf7-sg-table").not(".cf7-sg-cloned-table-row").length<f+1&&a.cf7sgCloneRow(!1,null),t(`:input[name=${g}]`,a).prefillCF7Field(s[d][p],i),f++}}),e.click(".container",function(e){var a=t(e.target);if(a.is("div.cf7-sg-table-button a")){if((a=a.parent()).hasClass("disabled"))return;var i=a.prev(".container");i.is(".cf7-sg-table-footer")&&(i=i.prev(".container")),i.cf7sgCloneRow(!0,e.target)}else a.is(".cf7-sg-table .row-control .dashicons")&&a.closest(".container").cf7sgRemoveRow()})),(e=t("div.cf7-smart-grid.has-validation form.wpcf7-form")).length&&(t('input[type="number"][class*="sgv-"]',e).each(function(){var e=t(this),a=e.attr("name"),i=e.closest("div.cf7-smart-grid").attr("id"),s=e.attr("value");r(cf7sg[i],["prefill",a])||(e.prefillCF7Field(cf7sg[i].prefill[a],i),s=cf7sg[i].prefill[a],delete cf7sg[i].prefill[a]),e.data("current",s)}),e.change('input[type="number"]',function(e){if(t(e.target).is('input[type="number"]')){var a=t(e.target),i=a.data("current"),s=!1;switch(!0){case 0==a.val()&&a.is(".sgv-no-zero"):a.after('<span class="cf7sg-validation-warning">Value cannot be zero</span>'),a.val(i),s=!0;break;case 0>a.val()&&a.is(".sgv-no-negative"):a.after('<span class="cf7sg-validation-warning">Value cannot be negative</span>'),a.val(i),s=!0;break;case""==a.val()&&a.hasClass("sgv-not-empty"):a.after('<span class="cf7sg-validation-warning">Value cannot be empty</span>'),a.val(i),s=!0}s&&a.next("span.cf7sg-validation-warning").delay(3e3).fadeOut("slow").remove()}}));var e=t("div.cf7-smart-grid.has-accordion form.wpcf7-form");e.length>0&&(e.filter("div.has-toggles form.wpcf7-form").each(function(){var e=t(this),a=t(".cf7sg-collapsible.with-toggle",e),i="",s=t('input[name="_cf7sg_toggles"]',e),n=!1,c={};s.length>0&&(i=s.val().length>0?JSON.parse(s.val()):{},n=!0),t.fn.trackToggle=function(e){if(!n)return!1;var a=t(this),r=a.attr("id");if(!a.is(".with-toggle"))return!1;if(e){var l=t(".cf7sg-collapsible-title",a).clone(),c=l.children(".toggle").data("on");l.children(".toggle").remove(),i[r]=l.text().trim()+"|"+c}else i.hasOwnProperty(r)&&delete i[r];void 0!==r&&s.length>0&&s.val(JSON.stringify(i))},e.on("click",".cf7sg-collapsible.with-toggle",function(a){var i,s=t(a.target);if(s.is("span.cf7sg-title.toggled")||s.is(".toggle-on")||s.is(".toggle-off")||s.is(".toggle"))i=s.closest(".cf7sg-collapsible-title");else{if(!s.parent().is(".cf7sg-collapsible.with-toggle"))return;i=s}if(t(".toggle",i).is(".disabled"))return!1;var r=i.closest(".container.cf7sg-collapsible"),n=r.attr("id"),l=i.parent().removeClass("collapsed").data("group");l&&t('.cf7sg-collapsible.with-toggle[data-group="'+l+'"]',e).each(function(){var e=t(this),a=t(".toggle",e);if(n===e.attr("id")){c[l]&&a.toggleClass("disabled",!0);return}0===e.accordion("option","active")&&(e.addClass("collapsed"),a.toggleClass("disabled",!1).data("toggles").toggle(!1),e.accordion("option","active",!1),t(".row.ui-accordion-content :input",e).prop("disabled",!0),e.trackToggle(!1))});var o=i.children(".toggle").data("toggles");if(void 0===o&&cf7sg.debug&&(console.log("undefined toggleSwitch, header parent:"),console.log(i),console.log("e.target:"),console.log(a.target)),i.hasClass("ui-state-active")){o.toggle(!0);var d=t(".row.ui-accordion-content :input",i.parent()).not(".cf7-sg-cloned-table-row :input").not(".collapsed :input").prop("disabled",!1);e.is(".has-nice-select form")&&d.filter(".wpcf7-form-control.nice-select:enabled").niceSelect(),r.trackToggle(!0)}else o.toggle(!1),t(".row.ui-accordion-content :input",i.parent()).each(function(){var e=this.value;t(this).val(e.trim()).prop("disabled",!0)}),r.trackToggle(!1)}),a.each(function(){var a=t(this),i=a.attr("id");void 0===i&&(i=l(6),a.attr("id",i));var s=a.data("open"),n=a.data("group"),o=!1;n&&void 0===c[n]&&(c[n]=!1),void 0===s?s=!1:!0===s&&(s=0,o=!0);var d=0==e.closest("div.cf7_2_post").length&&!o,f=a.closest("div.cf7-smart-grid").attr("id");t(":input",a.children(".row")).each(function(){var e=t(this),a=e.attr("name").replace("[]","");r(cf7sg[f],["prefill","_cf7sg_toggles",i])||(e.prefillCF7Field(cf7sg[f].prefill[a],f),s=0,o=!0,delete cf7sg[f].prefill[a]),d&&e.prop("disabled",!0)}),o||a.addClass("collapsed"),a.children(".cf7sg-collapsible-title").children(".toggle").setupToggle(o,n),o&&(a.trackToggle(!0),n&&(c[n]=!0)),t("#"+i).accordion({collapsible:!0,icons:!1,active:s,header:"> div.cf7sg-collapsible-title",heightStyle:"content",activate:function(e,a){t(this).trigger("sgContentIncrease")},beforeActivate:function(e,a){if(t(".toggle",a.oldHeader).is(".disabled"))return!1},create:function(e){t(this).trigger({type:"sgCollapsibleRowsReady","section-id":i})}})}),a.on("sgContentIncrease",function(){t(this).accordion("refresh")})}),e.each(function(){var e=t(this),a=t(".cf7sg-collapsible",e).not(".cf7sg-collapsible.with-toggle").not(".cf7sg-accordion-rows > .cf7sg-collapsible").not(".cf7sg-slider-section >.cf7sg-collapsible");(a=a.add(t(".cf7sg-accordion-rows",e))).each(function(){var e=t(this),a=e.attr("id");void 0===a&&(a=l(6),e.attr("id",a));var i=e.data("open"),s=!1;void 0===i?i=!1:!0===i&&(i=0,s=!0);var r={heightStyle:"content",create:function(e){t(this).trigger({type:"sgCollapsibleRowsReady","section-id":a})}};e.is(".cf7sg-accordion-rows")?(e.children(".cf7sg-collapsible").children(".cf7sg-collapsible-title").addClass("accordion"),Object.assign(r,{header:"div.cf7sg-collapsible-title.accordion",animate:!1})):Object.assign(r,{collapsible:!0,active:i,header:"> div.cf7sg-collapsible-title",activate:function(e,a){t(this).trigger("sgContentIncrease")}}),t("#"+a).accordion(r),e.on("sgContentIncrease",function(){t(this).accordion("refresh")})})})),(e=t("div.cf7-smart-grid.has-tabs form.wpcf7-form")).length&&(i={},e.click("ul.ui-tabs-nav li",function(e){var a=t(e.target),i=a.closest(".cf7-sg-tabs");a.is(".cf7sg-close-tab")?i.cf7sgRemoveTab():a.is(".cf7sg-add-tab")&&i.cf7sgCloneTab(!0,!0)}),t(".cf7-sg-tabs",e).each(function(){var e=t(this),a=e.closest("div.cf7-smart-grid").attr("id"),s=e.children(".cf7-sg-tabs-list"),n=[],l=[];if(1==s.children("li").length){s.after('<ul class="cf7sg-add-tab ui-tabs-nav"><li class="ui-state-default ui-corner-top"><a class="cf7sg-add-tab ui-tabs-anchor"><span class="cf7sg-add-tab dashicons dashicons-plus"></span></a></li></ul>');var c=e.children(".cf7-sg-tabs-panel").first(),o=t('<input class="cf7sg-tracker-field" value="1" type="hidden">').attr("name",c.attr("id"));e.prepend(o),c.find(":input").each(function(){var e=t(this),i=e.attr("name").replace("[]",""),s=!1;r(cf7sg[a],["prefill",i])||(s=!0),e.is(".cf7-sg-table :input")?(e.addClass("cf7sgtab-field"),s&&(l[i]=cf7sg[a].prefill[i],delete cf7sg[a].prefill[i])):i.length>0&&(e.addClass("cf7sg-"+i+" cf7sgtab-field"),s&&(n[i]=cf7sg[a].prefill[i],delete cf7sg[a].prefill[i]))});var d=t("<div>").append(c.clone());t(":input",d).prop("disabled",!0),i[c.attr("id")]=d.html()}e.tabs({create:function(e){let i=t(this),r="",c=0,o=0;for(let d in n){if("[object Object]"!==String(n[d])){cf7sg.debug&&console.log(`ERROR: Prefill tab field ${d} value should be array`);return}for(let f in c=0,n[d])r=c>0?`${d}_tab-${c}`:d,s.children("li").length<c+1&&i.cf7sgCloneTab(!0,!1),t(`:input[name=${r}]`).prefillCF7Field(n[d][f],a),c++}for(let g in l){if("[object Object]"!==String(l[g])){cf7sg.debug&&console.log(`ERROR: Prefill tabbed table field ${g} value should be 2D array`);return}let p=null;for(let u in c=0,l[g]){if("[object Object]"!==String(l[g][u])){cf7sg.debug&&console.log(`ERROR: Prefill tabbed table field ${g} value should be 2D array`);return}for(let h in r=c>0?`${g}_tab-${c}`:g,s.children("li").length<c+1&&(i=i.cf7sgCloneTab(!0,!1)),p=t(`:input[name=${r}]`,i).closest(".container.cf7-sg-table"),o=0,l[g][u])r=o>0?`${r}_row-${o}`:r,p.children(".row.cf7-sg-table").not(".cf7-sg-cloned-table-row").length<o+1&&p.cf7sgCloneRow(!1,null),t(`:input[name=${r}]`,p).prefillCF7Field(l[g][u][h],a),o++;c++}}i.trigger("sgTabsReady")}})})),t("div.cf7-smart-grid").each(function(){var e=t(this),a=e.attr("id");r(cf7sg[a],["prefill"])||Object.keys(cf7sg[a].prefill).forEach(function(i){var s=t("."+i+" :input",e);0==s.length&&(s=t(':input[name="'+i+'"]',e)),s.prefillCF7Field(cf7sg[a].prefill[i],a)})}),(e=t("div.cf7-smart-grid.has-nice-select form.wpcf7-form")).length>0&&(e.filter("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this),a=e.closest("div.cf7_2_post").attr("id");a.length>0&&e.on(a,function(e){t(".cf7sg-dynamic-dropdown.ui-select:enabled",$this).each(function(){t(this).niceSelect()}),t(".wpcf7-form-control.nice-select:enabled",$this).each(function(){t(this).niceSelect()}),t(this).trigger("sgNiceSelect")})}),e.not("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this);t(".cf7sg-dynamic-dropdown.ui-select:enabled",e).each(function(){t(this).niceSelect()}),t(".wpcf7-form-control.nice-select:enabled",e).each(function(){t(this).niceSelect()}),e.on("cf7SmartGridReady",function(t){e.trigger("sgNiceSelect")})})),(e=t("div.cf7-smart-grid.has-select2 form.wpcf7-form")).length>0&&(e.filter("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this),a=e.closest("div.cf7_2_post").attr("id");a.length>0&&e.on(a,function(e){var a=t(this);t("select.wpcf7-form-control.select2:enabled",a).each(function(){var e=t(this);e.select2(e.cf7sgSelect2Options())}),a.trigger("sgSelect2")})}),e.not("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this);t("select.wpcf7-form-control.select2:enabled",e).each(function(){var e=t(this);e.select2(e.cf7sgSelect2Options())}),e.on("cf7SmartGridReady",function(t){e.trigger("sgSelect2")})})),(e=t("div.cf7-smart-grid.has-hybriddd form.wpcf7-form")).length>0&&(e.filter("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this),a=e.closest("div.cf7_2_post").attr("id");a.length>0&&e.on(a,function(a){t(".cf7sg-dynamic_checkbox",e).each(function(){new HybridDropdown(this,t(this).cf7sgHybridddOptions())})})}),e.not("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this);t(".cf7sg-dynamic_checkbox",e).each(function(){new HybridDropdown(this,t(this).cf7sgHybridddOptions())})}));var a=document.createElement("input");a.setAttribute("type","date");var s="date"==a.type;function l(t){t||(t=5);for(var e="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",i=0;i<t;i++)e+=a.charAt(Math.floor(Math.random()*a.length));return e}(e=t("div.cf7-smart-grid.has-date form.wpcf7-form")).length>0&&(e.filter("div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this),a=e.closest("div.cf7_2_post").attr("id");a.length>0&&e.on(a,function(e){t("input.wpcf7-date:enabled",t(this)).each(function(){var e=t(this),a=e.attr("id");void 0===a&&(a=l(6),e.attr("id",a)),s||e.setupDatePicker()}),t("input.wpcf7-text.datepicker:enabled",t(this)).each(function(){var e=t(this),a=e.attr("id");void 0===a&&(a=l(6),e.attr("id",a)),e.setupDatePicker()})})}),e.not("div.cf7_2_post form.wpcf7-form").each(function(){t("input.wpcf7-text.datepicker:enabled",t(this)).each(function(){var e=t(this),a=e.attr("id");void 0===a&&(a=l(6),e.attr("id",a)),e.setupDatePicker()}),t("input.wpcf7-date:enabled",t(this)).each(function(){var e=t(this),a=e.attr("id");void 0===a&&(a=l(6),e.attr("id",a)),s||e.setupDatePicker()})})),(e=t("div.cf7-smart-grid.has-slider form.wpcf7-form")).each(function(){var e=t(this).closest(".cf7-smart-grid").attr("id");t(".cf7sg-slider-section").each(function(){var a,i=t(this).wrapInner('<div class="glider"></div>'),s=t(".glider",i),r=i.closest(".container").next(".cf7sg-slider-controls"),n=t('<span class="slider-control slider-prev"></span>'),l=t('<span class="slider-control slider-next"></span>'),c=!1,o=null,d={arrows:{prev:".slider-prev",next:".slider-next"}};if(r.length>0){n=t(".slider-prev",r),l=t(".slider-next",r);let f=document.createElement("style");f.setAttribute("id",e+"-slider-controls"),f.type="text/css",f.innerText="#"+e+" .cf7sg-slider-controls > .cf7sg-submit-controls {max-width: calc(100% - "+(n.outerWidth()+10)+"px)}",document.head.appendChild(f),(o=t(".cf7sg-submit-controls",r)).length>0&&(c=!0,o.hide())}else if(void 0!==i.data("prev")&&(i.data("prev").length>0?n.text(i.data("prev")).addClass("ui-button"):n.addClass("dashicons dashicons-arrow-left-alt")),void 0!==i.data("next")&&(i.data("next").length>0?l.text(i.data("next")).addClass("ui-button"):l.addClass("dashicons dashicons-arrow-right-alt")),i.append(n).append(l),i.data("submit").length>0){c=!0,o=t('<span><input type="submit" value="'+i.data("submit")+'" class="slider-control wpcf7-form-control wpcf7-submit"></span>'),l.after(o);let g=(o.outerHeight()-16)/2;o.hide().append('<span style="margin:'+g+'px 5px;" class="ajax-loader"></span>')}if(n.hide(),i.data("dots")){n.before('<span class="slider-dots"></span>'),d.dots=".slider-dots";let p=i.data("dots");!0!==p&&(d.labelDots=p.split(","));let u=t("form.wpcf7-form input[type=submit]:not(.cf7_2_post_save)").get(0);if(u){u=window.getComputedStyle(u);let h=document.createElement("style");h.setAttribute("id","cf7sg-slider-dots"),h.type="text/css",h.innerText=".glider-dot:hover, .glider-dot:focus, .glider-dot.active{background:"+u["background-color"]+";color:"+u.color+"}",document.body.appendChild(h)}}s.on("glider-loaded",function(t){i.trigger({type:"sgSliderReady",total:s.find(".glider-slide").length})}).on("glider-slide-visible",function(s){let r=!0;switch(n.show(),l.show(),c&&o.hide(),s.detail.slide){case 0:n.hide(),r=!1;break;case a.slides.length-1:l.hide(),c&&o.show()}r&&cf7sg[e].slider_auto_scroll&&t(window).scrollTop(i.offset().top-35),t(s.target).find(".glider-slide.active").trigger({type:"sgSlideChange",current:s.detail.slide,last:t(s.target).find(".glider-slide").length-1})}),a=new Glider(s[0],d),i.on("sgRowAdded sgRowDeleted",function(t){a.refresh(!0)})})}),t.fn.sgCurrentSlide=function(){var e=t(this);return!!e.is(".cf7sg-slider-section")&&parseInt(e.find(".glider-slide.active").data("gslide"))},t.fn.sgChangeSlide=function(e){var a=t(this);if(!a.is(".cf7sg-slider-section"))return a;var i=Glider(t(".glider",a)[0]),s=a.sgCurrentSlide();return n(e)?s<i.slides.length&&i.scrollItem(s+1):e<0?s>0&&i.scrollItem(s-1):(e=parseInt(e))>=0&&e<=i.slides.length&&i.scrollItem(e),a},t("div.cf7-smart-grid.has-toggles div.cf7_2_post form.wpcf7-form").each(function(){var e=t(this),a=e.closest("div.cf7-smart-grid").attr("id"),i=e.closest("div.cf7_2_post").attr("id");i.length>0&&e.on(i,function(e){t(".cf7sg-collapsible.with-toggle",t(this)).each(function(){var e=t(this),i=e.attr("id");r(cf7sg[a],["toggles",i])?t(".row.ui-accordion-content :input",e).prop("disabled",!0):e.children(".cf7sg-collapsible-title").trigger("click")})})}),t("div.cf7-smart-grid form.wpcf7-form").addClass("cf7sg-ready").trigger("cf7SmartGridReady"),t("div.cf7-smart-grid").on("wpcf7:invalid wpcf7invalid wpcf7mailsent",".wpcf7",function(e){var a,i=t(e.target);switch(e.type){case"wpcf7mailsent":if(!n(cf7sg[e.delegateTarget.id])&&cf7sg[e.delegateTarget.id].redirect.length>0){var s=t(".cf7_2_post_draft",i);(0==s.length||"false"===s.val())&&window.location.replace(cf7sg[e.delegateTarget.id].redirect)}break;case"wpcf7invalid":case"wpcf7:invalid":if(void 0!==(a=e.detail).apiResponse)for(var r in a=a.apiResponse.invalid_fields){for(var l=t(a[r].into),c=l.parents(".cf7sg-collapsible:not(.glider-slide)"),o=0;o<c.length;o++)t(c[o]).attr("data-cf7sg","error"),t(c[o]).is(".cf7sg-accordion-rows .cf7sg-collapsible")?t(c[o]).closest(".cf7sg-accordion-rows").accordion("option","active",o):c.accordion("option","active",0);if((c=l.closest(".cf7-sg-tabs-panel")).length>0){for(var d=c.attr("id"),f=t(".cf7-sg-tabs-list",c=c.closest(".cf7-sg-tabs")).children(),g=0;g<f.length;g++)if(d==t(f[g]).attr("aria-controls")){t(f[g]).attr("data-cf7sg","error"),c.tabs("option","active",g);break}}if((c=l.closest(".cf7sg-slider-section")).length>0){var p=l.closest(".glider-slide");p.attr("data-cf7sg","error"),Glider(t(".glider",c)[0]).scrollItem(p.data("gslide")),c.data("dots")&&t('.slider-dots button[data-index="'+p.data("gslide")+'"]',c).attr("data-cf7sg","error")}}}}).submit(function(e){var a=t(e.target);t('.cf7-sg-tabs-list li[data-cf7sg="error"]',a).attr("data-cf7sg",""),t('.cf7sg-collapsible[data-cf7sg="error"]',a).attr("data-cf7sg",""),t('.slider-dots button[data-cf7sg="error"]',a).attr("data-cf7sg","")}),t("select.select2").closest("form").on("reset",function(e){t("select.select2",t(this)).val(null).trigger("change")}),t("div.cf7-smart-grid.has-grid .wpcf7-submit").each(function(){var e=t(this),a=e.closest("div.cf7-smart-grid").attr("id");void 0!==cf7sg[a].submit_disabled&&e.after('<span class="cf7sg-popup display-none">'+cf7sg[a].submit_disabled+"</span>").parent().addClass("cf7sg-popup-box")}),t("div.cf7-smart-grid.has-table").on("sgRowAdded",".container.cf7-sg-table",function(e){var a,i,s=t(this),r=s.closest("div.cf7-smart-grid").attr("id");if(void 0!==(a=s.data("max"))&&!1!=a&&--a==e.row){var i=s.data("max-row-msg");i='<span class="max-limit wpcf7-not-valid-tip">'+(i=n(i)?cf7sg[r].max_table_rows:i)+"</span>",s.siblings(".cf7-sg-table-button").addClass("disabled").prepend(i)}}),t("div.cf7-smart-grid.has-table").on("sgRowDeleted",".container.cf7-sg-table",function(e){var a,i=t(this);void 0!==(a=i.data("max"))&&!1!=a&&i.siblings(".cf7-sg-table-button").removeClass("disabled").children(".max-limit").remove()}),t("form.wpcf7-form").each(function(){let t=this;t.querySelectorAll(".wpcf7-response-output").forEach(t=>{t.classList.remove("wpcf7-response-output"),t.classList.add("cf7sg-response-output"),t.innerHTML='<div class="wpcf7-response-output"></div>'}),this.addEventListener("wpcf7submit",function(e){e.detail.apiResponse&&e.detail.apiResponse.message&&t.querySelectorAll(".cf7sg-response-output").forEach(t=>{let a=e.detail.apiResponse.message;if(0==a.indexOf("cf7sg->redirect:"))return location=a.replace("cf7sg->redirect:",""),!1;t.innerHTML=`${a}<div class="wpcf7-response-output"></div>`})})})});var s=function(e){if(!e.id)return e.text;var a=t(e.element);return t('<a href="'+a.data("permalink")+'">'+e.text+"</a>")};function r(t,e){if(n(e)&&(e=[]),n(t))return!0;for(var a=t,i=0;i<e.length;i++){if(n(a[e[i]]))return!0;a=a[e[i]]}return!1}function n(t){return null==t||("number"==typeof t?isNaN(t):!Boolean(t))}t.fn.prefillCF7Field=function(e,a){var i=t(this);if(!i.is(":input"))return!1;t(this);var s=i.attr("name"),r=i[0],l=r.type;if(n(r))return cf7sg.debug&&console.log("CF7SG ERROR: Unable to retrieve form element "+s),i;switch(i.length>0&&(l=i[0].type),l){case"select-multiple":case"select":Array.isArray(e)||(e=[e]),e.forEach(function(t){r.querySelector('option[value="'+t+'"]').selected=!0});break;case"checkbox":case"radio":r=r.closest(".wpcf7-form-control-wrap"),Array.isArray(e)||(e=[e]),e.forEach(function(t){r.querySelector('input[value="'+t+'"]').checked=!0});break;default:r.value=e}return i},t.fn.cf7sgSelect2Options=function(){var e=t(this),a={tags:e.is(".tags")},i=e.attr("name").replace("[]","");return e.is(".cf7sg-permalinks")&&(a.templateSelection=s,a.templateResult=s),cf7sgCustomSelect2Templates[i]&&(a=Object.assign(a,cf7sgCustomSelect2Templates[i])),a},t.fn.cf7sgHybridddOptions=function(t={}){if(!this.is(".cf7sg-dynamic_checkbox"))return!1;let e=this.closest("div.cf7-smart-grid").attr("id"),a={},i=this.data("field-name");return this.is(".cf7sg-hybriddd")?a.optionLabel=function(t){let e="",a="";if(Array.isArray(t)){e=t[0];for(let i=1;i<t.length;i++)a+=` ${t[i]}`}else e=t;return`<span${a}>${e}</span>`}:this.is(".cf7sg-imagehdd")&&(a.optionLabel=function(t){let e="",a="",i="";if(Array.isArray(t)){e=t[0];for(let s=1;s<t.length;s++)t[s].indexOf("data-thumbnail")>-1?i=t[s].replace("data-thumbnail","src"):a+=` ${t[s]}`}return`<div${a}><img ${i} alt="${e}" /><p>${e}</p></div>`}),cf7sgCustomHybridddTemplates[i]&&(a=Object.assign(a,cf7sgCustomHybridddTemplates[i])),r(cf7sg[e],["prefill",i])||("object"==typeof cf7sg[e].prefill[i]?a.selectedValues=Object.values(cf7sg[e].prefill[i]):a.selectedValues=[cf7sg[e].prefill[i]]),a},t.fn.activateCF7sgCollapsibleSection=function(e){null===e&&(e=!0);var a,i=t(this);if(!i.is(".cf7sg-collapsible"))return!1;switch(a=i.children(".cf7sg-collapsible-title"),!0){case e&&!a.is(".ui-state-active"):case!e&&a.is(".ui-state-active"):a.trigger("click")}return i},t.fn.getCF7field=function(e,a){null===a&&(a={});var i=t(this);if(void 0===e||0==e.length)return cf7sg.debug&&console.log("CF7 Smart-grid ERROR: getCF7field() requires valid field name."),!1;if(!i.is(".wpcf7-form"))return cf7sg.debug&&console.log("CF7 Smart-grid ERROR: getCF7field() using unknown form"),!1;var s=void 0!==a.tab,r=void 0!==a.row,n=[];switch(!0){case s&&a.tab>0&&r&&a.row>0:n=t(':input[name="'+e+"_tab-"+a.tab+"_row-"+a.row+'"]',i);break;case s&&r:n=t(':input[name="'+e+'"]',i);break;case s&&a.tab>0&&r:n=t(':input[name="'+e+"_tab-"+a.tab+'"]',i);break;case s&&a.tab>0:n=t(':input[name*="'+e+"_tab-"+a.tab+'"], :input[name*="'+e+"_tab-"+a.tab+'_row-"]',i);break;case s:n=t(':input[name*="'+e+'_row-"], :input[name="'+e+'"]',i);break;case r&&a.row>0&&s:n=t(':input[name="'+e+"_row-"+a.row+'"]',i);break;case r&&a.row>0:n=t(':input[name="'+e+"_row-"+a.row+'"]',i).add(t(':input[name*="'+e+'_tab-"]',i).filter(':input[name$="_row-'+a.row+'"]'));break;case r:n=t(':input[name="'+e+'"], :input[name$="'+e+'_tab-"]',i);break;default:n=t(':input[name*="'+e+'"]',i)}return n.not(".cf7-sg-cloned-table-row :input")},t.fn.setupDatePicker=function(){var e=t(this);if(!e.is(".wpcf7-date:enabled")&&!e.is(".wpcf7-text.datepicker:enabled"))return e;var a="",i="",s=e.attr("min");void 0===s?s=null:a=(s=new Date(s)).getFullYear();var r=e.attr("max");return void 0===r?r=null:i=(r=new Date(r)).getFullYear(),e.datepicker("destroy"),e.datepicker({defaultDate:e.val(),dateFormat:"yy-mm-dd",minDate:s,maxDate:r,changeMonth:!0,changeYear:!0}),a>0&&i>0?e.datepicker("option","yearRange",a+":"+i):a>0?e.datepicker("option","yearRange",a+":c+20"):i>0&&e.datepicker("option","yearRange","c-20:"+i),e},t.fn.toggleCF7sgTableRowAddition=function(e){null===e&&(e=!1);var a=t(this);return!!a.is(".container.cf7-sg-table")&&(e?a.next(".cf7-sg-table-button").show():a.next(".cf7-sg-table-button").hide(),a)},t.fn.toggleCF7sgTableRowDeletion=function(e){null===e&&(e=!1);var a=t(this);return!!a.is(".container.cf7-sg-table")&&(e?t(".row.cf7-sg-table:nth-last-child(2) .row-control",a).removeClass("display-none"):t(".row.cf7-sg-table:nth-last-child(2) .row-control",a).addClass("display-none"),a)},t.fn.cf7sgCountRows=function(){var e=t(this);return!!e.is(".container.cf7-sg-table")&&e.children(".row").not(".cf7-sg-cloned-table-row").length},t.fn.cf7sgRemoveRow=function(){var e=t(this);if(!e.is(".container.cf7-sg-table"))return!1;var a=e.children(".row").not(".cf7-sg-cloned-table-row");if(a.length>1){a.last().remove(),e.trigger("sgRowDeleted");var i=e.children(".cf7sg-tracker-field");i.length&&i.val(a.length-1)}return e},t.fn.cf7sgCloneRow=function(e,a){void 0===e&&(e=!0);var i=t(this),s="";if(i.is(".cf7-sg-table-footer")&&(s=i,i=i.closest(".container.cf7-sg-table")),!i.is(".container.cf7-sg-table"))return i;var r=i.children(".row.cf7-sg-table").length-1,n=t(".cf7-sg-cloned-table-row",i),l=n.clone(),c=i.closest("div.cf7-smart-grid").attr("id");l.removeClass("cf7-sg-cloned-table-row").attr("data-row",r),cf7sg[c].table_labels&&t(".field > label",l).remove(),s.length>0?s.before(l.show()):n.before(l.show()),String.prototype.endsWith||(String.prototype.endsWith=function(t,e){var a=this.toString();("number"!=typeof e||!isFinite(e)||Math.floor(e)!==e||e>a.length)&&(e=a.length),e-=t.length;var i=a.indexOf(t,e);return -1!==i&&i===e}),t(":input",l).each(function(){var a=t(this),i=a.attr("id"),s=a.closest("span.wpcf7-form-control-wrap"),n=a.is('[type="radio"]')||a.is('[type="checkbox"]');!i&&n&&(i=s.attr("id")),a.prop("disabled",!1);var l=a.attr("name").replace("_cf7sgcloned_",""),c="";if(l.endsWith("[]")&&(l=l.replace("[]",""),c="[]"),a.attr("name",l+"_row-"+r+c),s.removeClass(l).addClass(l+"_row-"+r),s.data("name")&&s.attr("data-name",l+"_row-"+r),i){if(n)s.attr("id",i+"_row-"+r);else{a.attr("id",i+"_row-"+r);var o=s.siblings("label");o.attr("for")===i&&o.attr("for",i+"_row-"+r)}}a.is("select.ui-select")&&e&&a.niceSelect(),a.is("select.nice-select")&&e&&a.niceSelect(),a.is("select.select2")&&e&&(a.select2(a.cf7sgSelect2Options()),a.trigger("sgSelect2"))}),t(".cf7sg-dynamic_checkbox",l).each(function(){new HybridDropdown(this,t(this).cf7sgHybridddOptions())}),i.trigger("sgContentIncrease"),i.trigger({type:"sgRowAdded",row:r,button:a});var o=i.children(".cf7sg-tracker-field");return o.length&&o.val(r+1),i},t.fn.toggleCF7sgTabAddition=function(e){null===e&&(e=!1);var a=t(this);return!!a.is("div.cf7-sg-tabs")&&(e?t(".cf7sg-add-tab",a).show():t(".cf7sg-add-tab",a).hide(),a)},t.fn.toggleCF7sgTabDeletion=function(e){null===e&&(e=!1);var a=t(this);return!!a.is("div.cf7-sg-tabs")&&(e?t(".cf7-sg-tabs-list li:last-child .cf7sg-close-tab",a).removeClass("display-none").show():t(".cf7-sg-tabs-list li:last-child .cf7sg-close-tab",a).addClass("display-none").hide(),a)},t.fn.cf7sgCountTabs=function(){var e=t(this);return!!e.is("div.cf7-sg-tabs")&&e.find(".cf7-sg-tabs-list").children("li").length},t.fn.cf7sgRemoveTab=function(){var e=t(this);if(!e.is("div.cf7-sg-tabs"))return!1;var a=e.find(".cf7-sg-tabs-list").children("li");if(a.length>1){var i=a.last().find("a").attr("href");e.find("div"+i).remove(),a.last().remove().is(".ui-state-active")&&e.tabs({active:a.length-2}),e.trigger("sgTabRemoved");var s=a.eq(a.length-2).find(".cf7sg-close-tab:not(.display-none)");s.length>0&&s.show();var r=e.children(".cf7sg-tracker-field");r.length&&r.val(e.children(".cf7-sg-tabs-panel").length)}return e},t.fn.cf7sgCloneTab=function(e,a){null===a&&(a=!1);var s=t(this);if(void 0===e&&(e=!0),!s.is("div.cf7-sg-tabs"))return!1;var r=s.children(".cf7-sg-tabs-list"),n=r.children("li").length+1,l=s.children(".cf7-sg-tabs-panel").first().attr("id"),c=l+"-"+n,o=r.children("li").first().clone();o.find("a").attr("href","#"+c).text(o.text()+" ("+n+")"),o.append('<span class="cf7sg-close-tab dashicons dashicons-no-alt"></span>'),o.removeClass("ui-tabs-active ui-state-active"),r.find("li .cf7sg-close-tab").hide(),r.append(o);var d=t(i[l]);d.attr("id",c),t(":input",d).each(function(){var a=t(this),i=a.attr("id"),s=a.closest("span.wpcf7-form-control-wrap"),r=a.is(".cf7-sg-cloned-table-row :input"),l=a.attr("name"),c="";if(r||a.prop("disabled",!1),l.endsWith("[]")&&(l=l.replace("[]",""),c="[]"),a.attr("name",l+"_tab-"+(n-1)+c),s.removeClass(l).addClass(l+"_tab-"+(n-1)),s.data("name")&&s.attr("data-name",l+"_tab-"+(n-1)),i){a.attr("id",i+"_tab-"+(n-1));var o=s.siblings("label");o.attr("for")===i&&o.attr("for",i+"_tab-"+(n-1))}!r&&a.is("select.ui-select")&&e&&a.niceSelect(),!r&&a.is("select.nice-select")&&e&&a.niceSelect(),!r&&a.is("select.select2")&&e&&(a.select2(a.cf7sgSelect2Options()),a.trigger("sgSelect2"))}),t(".cf7sg-dynamic_checkbox",d).not(".cf7-sg-cloned-table-row *").each(function(){new HybridDropdown(this,t(this).cf7sgHybridddOptions())}),s.append(d),d.find("ul.ui-tabs-nav li a").each(function(){var e=t(this);c=e.attr("href"),e.attr("href",c+"-"+n),e.closest("ul.ui-tabs-nav").siblings("div"+c).attr("id",c.substring(1)+"-"+n)}),t(".cf7-sg-tabs",d).each(function(){t(this).tabs()}),t(".cf7sg-collapsible.with-toggle",d).each(function(){var a=t(this),i=a.attr("id");a.attr("id",i+"_tab-"+(n-1));var s=a.data("group");s&&(s=s+"_tab-"+(n-1),a.attr("data-group",s));var r=a.data("open"),l=!1;void 0===r?r=!1:!0===r&&(r=0,l=!0),t(".toggle",a).setupToggle(l,s),l&&a.trackToggle(!0),!l&&e&&(t(".row.ui-accordion-content :input",a).prop("disabled",!0),a.addClass("collapsed")),t(".cf7sg-collapsible",d).accordion({collapsible:!0,icons:!1,active:r,header:"> div.cf7sg-collapsible-title",heightStyle:"content",activate:function(e,a){t(this).trigger("sgContentIncrease")},beforeActivate:function(e,a){if(t(".toggle",a.oldHeader).is(".disabled"))return!1},create:function(e){t(this).trigger({type:"sgCollapsibleRowsReady","section-id":i,"tab-index":n-1})}})}),s.tabs("refresh"),a&&s.tabs("option","active",-1),d.trigger({type:"sgTabAdded","tab-index":n-1}),t(".cf7-sg-table.container",d).each(function(){var e=t(this),a=e.attr("id");e.attr("id",a+"_tab-"+(n-1)),e.trigger({type:"sgTableReady","table-id":a,"tab-index":n-1})});var f=s.children(".cf7sg-tracker-field");return f.length>0&&f.val(s.children(".cf7-sg-tabs-panel").length),s},t.fn.setupToggle=function(e,a){var i=t(this);if(void 0===e&&(e=!1),!i.is(".toggle"))return i;if(i.length>0){var s=i.data("on");0==s.length&&(s="Yes");var r=i.data("off");0==s.length&&(r="No"),i.toggles({drag:!1,text:{on:s,off:r},on:e}),a&&e&&i.toggleClass("disabled",!0)}return i},t("div.cf7-smart-grid.has-update form.wpcf7-form").on("cf7SmartGridReady",function(){var i=t(this);t.ajax({type:"POST",url:cf7sg.url,dataType:"json",data:{action:"save_grid_fields",nonce:t('input[name="_wpnonce"]',i).val(),tabs_fields:JSON.stringify(e),table_fields:JSON.stringify(a),id:t('input[name="_wpcf7"]',i).val()}}).fail(function(t,e){console.log("CF7 Smart Grid ERROR sending grid fields to server: "+e)})})}(jQuery);