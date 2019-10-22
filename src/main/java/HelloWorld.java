

import org.json.JSONException;
import org.xml.sax.SAXException;
import javax.xml.parsers.ParserConfigurationException;

import javax.xml.transform.TransformerException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

import java.net.URLConnection;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.json.XML;
import static spark.Spark.*;
public class HelloWorld {
    public static int PRETTY_PRINT_INDENT_FACTOR = 4;
    public static String TEST_XML_STRING =
            "<?xml version=\"1.0\" ?><test attrib=\"moretest\">Turn this to JSON</test>";
    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException, TransformerException {
        String urlString = "";
        URL u = new URL("http://www.lb.lt/lt/currency/daylyexport/?xml=1&class=Eu&type=day&date_day=2019-10-16");
        URLConnection connection = u.openConnection();
        String redirect = connection.getHeaderField("Location");
        if (redirect != null){
            connection = new URL(redirect).openConnection();
        }
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine = in.lines().collect(Collectors.joining());
        try {
            JSONObject xmlJSONObj = XML.toJSONObject(inputLine);
            System.out.println(xmlJSONObj);
        } catch (JSONException je) {
            System.out.println(je.toString());
        }

// that’s the default xform; use a stylesheet to get a real one

    }
}
