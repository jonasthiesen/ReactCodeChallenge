export default function cx(...styleConfigs) {
  return styleConfigs
    .map((config) => {
      if (Array.isArray(config)) {
        const [styles, condition] = config
        return condition ? styles : ""
      } else {
        return config
      }
    })
    .join(" ")
}
