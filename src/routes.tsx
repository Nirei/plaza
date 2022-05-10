import React from 'react'
import ExternalProfilePage from './pages/ExternalProfilePage'
import InstallationWizardPage from './pages/InstallationWizardPage'
import LandingPage from './pages/LandingPage'
import TimelinePage from './pages/TimelinePage'

type RouterContext = {
  owned: boolean
  installed: boolean
}

type Router = {
  context: RouterContext
}

const genericRootGuard =
  (
    component: JSX.Element,
    ownedCondition: boolean,
    installedCondition: boolean,
  ) =>
  ({ context: { owned, installed } }: Router, next: () => any) => {
    if (owned === ownedCondition && installed === installedCondition)
      return component
    return next()
  }

const externalProfileGuard = genericRootGuard(
  <ExternalProfilePage />,
  false,
  true,
)

const landingPageGuard = genericRootGuard(<LandingPage />, false, false)

const installationWizardGuard = genericRootGuard(
  <InstallationWizardPage />,
  true,
  false,
)

export const routes = [
  {
    path: '/',
    component: <TimelinePage />,
    guards: [externalProfileGuard, landingPageGuard, installationWizardGuard],
  },
]
