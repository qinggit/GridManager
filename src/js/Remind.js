/*
 * Remind: 表头提醒
 * */
import { jTool } from './Base';
class Remind {
    // 启用状态
    enable = false;

	/**
	 * 获取表头提醒所需HTML
	 * @returns {string}
     */
	get html() {
		const html = `<div class="remind-action">
						<i class="ra-help iconfont icon-help"></i>
						<div class="ra-area">
							<span class="ra-title"></span>
							<span class="ra-con"></span>
						</div>
					</div>`;
		return html;
	}

	/**
	 * 初始化表头提醒
	 * @param $table
     */
	init($table) {
		this.__bindRemindEvent($table);
	}

	/**
	 * 绑定表头提醒功能
	 * @param table
     */
	__bindRemindEvent($table) {
		const remindAction = jTool('.remind-action', $table);
		remindAction.unbind('mouseenter');
		remindAction.bind('mouseenter', function () {
		    let _onlyRemind = jTool(this);
			let raArea = _onlyRemind.find('.ra-area');
			let tableDiv = _onlyRemind.closest('.table-div');
			raArea.show();
			let theLeft = (tableDiv.get(0).offsetWidth - (_onlyRemind.offset().left - tableDiv.offset().left)) > raArea.get(0).offsetWidth;
			raArea.css({
				left: theLeft ? '0px' : 'auto',
				right: theLeft ? 'auto' : '0px'
			});
		});
		remindAction.unbind('mouseleave');
		remindAction.bind('mouseleave', function () {
			let raArea = jTool(this).find('.ra-area');
			raArea.hide();
		});
	}

	/**
	 * 消毁
	 * @param $table
	 */
	destroy($table) {
		const remindAction = jTool('.remind-action', $table);

		// 清理: 表头提醒移入事件
		remindAction.unbind('mouseenter');

		// 清理: 表头提醒移出事件
		remindAction.unbind('mouseleave');
	}
}
export default new Remind();
