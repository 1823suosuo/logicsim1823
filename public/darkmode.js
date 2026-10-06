/* 暗色模式切换：localStorage 持久化，支持 ?dark=0/1 URL 参数（便于截图与分享） */
(function () {
    function apply(dark) {
        document.body.classList.toggle('dark', dark);
        try { localStorage.setItem('logicsim-theme', dark ? 'dark' : 'light'); } catch (e) { }
        var b = document.getElementById('darkToggle');
        if (b) {
            b.textContent = dark ? '☀ 亮色模式' : '🌙 暗色模式';
        }
    }
    var m = /[?&]dark=([01])/.exec(window.location.search);
    var saved = null;
    try { saved = localStorage.getItem('logicsim-theme'); } catch (e) { }
    if (m) {
        apply(m[1] === '1');
    } else {
        apply(saved === 'dark');
    }
    window.toggleDark = function () {
        apply(!document.body.classList.contains('dark'));
    };
})();
