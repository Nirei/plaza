interface Props<Element> {
  each: Element[]
  render: (element: Element, index: number) => JSX.Element
}

function For<Element>({ each, render }: Props<Element>) {
  return <>{each.map((element, index) => render(element, index))}</>
}

export default For
