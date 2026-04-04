const pages = [
  'pages/home/index', 
  'pages/chat/index',
  'pages/paper/index',
  'pages/patent/index',
  'pages/software/index',
  'pages/project/index'
]

//  To fully leverage TypeScript's type safety and ensure its correctness, always enclose the configuration object within the global defineAppConfig helper function.
export default defineAppConfig({
  pages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F8F9FA',
    navigationBarTitleText: '许卿的个人主页',
    navigationBarTextStyle: 'black'
  }
})
