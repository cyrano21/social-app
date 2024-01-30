import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations.ts";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Échec de connexion. Veillez réessayer.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Échec de l'inscription. Veillez réessayer." });
    }
  }

  return (
    <Form {...form}>
      <div className="flex-col sm:w-420 flex-center">
        <div className="flex items-center gap-1.5 mb-4">
          <img src="/assets/images/logoMU.png " alt="logo" className="w-7" />
          <p>Mindgram</p>
        </div>

        <h2 className="pt-5 mt-2 h3-bold md:h2-bold sm:pt-12">Se connecter</h2>
        <p className="text-light-3 small-mediuum md:base-regular">
          Un plaisir de vous revoir, merci d'ajouter vos détails
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input"
                    {...field}
                    autoComplete="on"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    {...field}
                    autoComplete=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader />
                Création en cours...
              </div>
            ) : (
              "Se connecter"
            )}
          </Button>

          <p className="mt-2 text-center text-small-regular text-light-2">
            Pas encore de compte ?
            <Link
              to="/sign-up"
              className="ml-1 text-primary-500 text-small-semibold"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
