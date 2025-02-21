import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading?: boolean
}

export function LoginForm({
  className,
  onSubmit,
  isLoading = false,
  ...props
}: LoginFormProps) {
  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      onSubmit={onSubmit} 
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login no Apto.rio</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira suas credenciais para acessar sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="seu-email@exemplo.com" 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a 
              href="/forgot-password" 
              className="ml-auto inline-block text-sm underline"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input 
            id="password"
            name="password"
            type="password" 
            placeholder="Sua senha" 
            required 
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <a href="#" className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  )
}
