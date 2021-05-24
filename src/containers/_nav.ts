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
    _tag: 'CSidebarNavItem',
    name: 'SLAs',
    to: '/sla',
    icon: 'cilFlagAlt'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Licences',
    to: '/licences',
    icon: 'cilLockLocked'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Marketplace']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Offers',
    to: '/offers',
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
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Product Offering Prices',
    to: '/prices',
    icon: 'cilDollar'
  }
]
