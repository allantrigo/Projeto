import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    const Route = this.app.container.use('Adonis/Core/Route')
    console.log(Route.toJSON())
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
