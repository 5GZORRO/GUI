export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Administration']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Membership',
    to: '/membership',
    icon: 'cilLibraryBuilding'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Proposals',
    to: '/proposals',
    icon: 'cilDescription'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Marketplace']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Discover Offers',
    to: '/discover-offers',
    icon: 'cilTag'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    to: '/orders',
    icon: 'cilBookmark'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Resource & Services',
    to: '/resource',
    icon: 'cilLayers'
  }
]
