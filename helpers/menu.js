
const public_menus = []
const private_menus = [
    { link: '/', icon: 'icon-grid menu-icon', text: 'Dashboard' },
    { link: '/card-list', icon: 'icon-paper menu-icon', text: 'คำทำนาย' },
    { link: '/form-list', icon: 'icon-folder menu-icon', text: 'ฟอร์ม' }
    // {
    //     link: '#', text: 'User Pages', controls: "userpage", menus: [
    //         { link: '/business', text: 'เจ้าของธุรกิจ' },
    //         { link: '/influencer', text: 'ผู้แนะนำสินค้า' },
    //     ]
    // },
];

module.exports = {
    public_menus,
    private_menus
}
