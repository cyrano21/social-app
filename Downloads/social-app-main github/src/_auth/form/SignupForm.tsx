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
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader.tsx";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations.ts";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading:isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Échec de l'inscription. Veillez réessayer.",
      });
    }

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

        <h2 className="pt-5 mt-2 h3-bold md:h2-bold sm:pt-12">
          Céer un compte.
        </h2>
        <p className="text-light-3 small-mediuum md:base-regular">
          Pour utiliser Mindgram, merci d'ajouter vos détails.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader />
                Création en cours...
              </div>
            ) : (
              "Sign-up"
            )}
          </Button>

          <p className="mt-2 text-center text-small-regular text-light-2">
            Déjà un compte ?
            <Link
              to="/sign-in"
              className="ml-1 text-primary-500 text-small-semibold"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
