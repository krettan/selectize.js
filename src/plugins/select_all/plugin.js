/**
 * Plugin: "select_deselect_all" (selectize.js)
 * Copyright (c) 2015 Carl Retzner & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Carl Retzner <carl.retzner@burtcorp.com>
 */

 Selectize.define('select_all', function(options) {
	if (this.settings.mode === 'single') return;
	var self = this;

	options = $.extend({
		select_all: {
			title: 'Select All',
			className: 'select-all',
			labelClass: 'select-all',
		},

		html: function(data) {
			return (
					'<a href="javascript:void(0)" class="' + data.className + '">' +  data.title + '</a>'
				);
		}
	}, options);

	this.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(self, arguments);

			self.$dropdown_select = $(options.html(options.select_all));
			self.$dropdown_select.on('click', function(e) {
				var allOptions = self.options;
				for (var currentOption in allOptions) {
					self.addItem(currentOption, false);
				}
			});

			self.$dropdown.prepend(self.$dropdown_select);
		};
	})();
});