import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decoration/customize'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true // No authentication needed if route is marked as public
    }

    return super.canActivate(context) // Delegate to passport-jwt strategy
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any): any {
    // Handle errors or return user based on the result of passport-jwt strategy
    if (err || !user) {
      throw err || new UnauthorizedException('Token không hợp lệ') // Throw UnauthorizedException if authentication fails
    }
    return user // User is authenticated, proceed with the request
  }
}
